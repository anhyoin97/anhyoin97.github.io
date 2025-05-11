---
title: "JWT란? 왜 사용할까?"
date: 2025-05-11 15:00:00 +0900
categories: [Study]
tags: [JWT, Spring Security, Spring Boot]
---


# 🎯 오늘의 목표

Spring Boot로 로그인 기능을 구현하려고 하면 대부분 JWT(Json Web Token)를 이용한 인증 방식에 도달하게 된다.  
JWT의 개념부터 실제 로그인 기능 구현 전까지, 꼭 이해하고 넘어가야 할 부분들을 정리해보려고 한다.

---

## 📌 1. JWT란?

JWT는 JSON Web Token의 줄임말로, **사용자의 인증 정보를 JSON 형식으로 담아서 암호화한 토큰**이다.

- **Stateless**한 인증 방식을 제공하며, 서버가 세션을 저장할 필요가 없다.
- 주로 **Access Token**과 **Refresh Token**으로 나뉘어 사용된다.

### 🧱 JWT 구조

JWT는 크게 세 부분으로 구성된다.

```
Header.Payload.Signature
```

예시:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiJ1c2VySWQiLCJpYXQiOjE2ODAwMDAwMDAsImV4cCI6MTY4MDA4NjQwMH0.
HkT7O6l2lZq5P8J1N_RL65HxqB34e2bB3KkPQBz8MXM
```

| 파트 | 설명 |
|------|------|
| Header | 토큰 타입(JWT)과 해싱 알고리즘 (예: HS256) |
| Payload | 사용자 정보 (sub, iat, exp 등) |
| Signature | 서명을 통해 위변조 방지 (비밀키 기반) |

---

## 🙋‍♂️ 2. 왜 JWT를 사용할까?

### 세션 방식과의 차이

| 항목 | 세션 방식 | JWT 방식 |
|------|-----------|-----------|
| 상태 유지 | 서버가 세션 저장 | 서버가 상태 저장 안 함 |
| 확장성 | 서버 간 세션 공유 필요 | 토큰만 있으면 어느 서버든 인증 가능 |
| 클라이언트 저장 | 세션 ID만 저장 | 전체 인증 정보 저장 |

### 언제 유리할까?

- 모바일 앱, SPA(단일 페이지 어플리케이션)
- 마이크로서비스, 서버리스 환경
- 서버에 상태를 저장하지 않아야 하는 시스템

---

## 📌 예제

### 🔧 1. JWT 의존성 추가

Gradle을 사용하는 경우 `build.gradle`에 의존성을 추가한다:

```groovy
implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.5'
runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.5'
```

---

### 🔐 2. JWT 유틸 클래스 생성

```java
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long expireTime = 1000 * 60 * 60; // 1시간

    // 토큰 생성
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(key)
                .compact();
    }

    // 토큰 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    // 사용자 정보 추출
    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
```

---

### 📦 3. 테스트 예제

```java
@RestController
@RequestMapping("/api/test")
public class JwtTestController {

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/generate")
    public String generateToken() {
        return jwtUtil.generateToken("test@example.com");
    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam String token) {
        return jwtUtil.validateToken(token) ? "유효한 토큰입니다." : "유효하지 않은 토큰입니다.";
    }
}
```

---
## 📌 Spring Security와 JWT 연동

### 🧱 1. 기본 Security 설정

`SecurityConfig.java` 파일을 생성하여 Spring Security 설정을 작성한다.

```java
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
```

---

### 🧱 2. JWT 필터 구현

```java
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String token = resolveToken(request);

        if (token != null && jwtUtil.validateToken(token)) {
            String email = jwtUtil.getEmailFromToken(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        return (bearer != null && bearer.startsWith("Bearer ")) ? bearer.substring(7) : null;
    }
}
```

---

### 👤 3. 로그인 요청 처리 API

```java
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        String token = jwtUtil.generateToken(request.getEmail());
        return ResponseEntity.ok(new JwtResponse(token));
    }
}
```

---

### 🧾 4. DTO 예시

```java
@Data
public class LoginRequest {
    private String email;
    private String password;
}

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
}
```

---

### ✅ 5. 결과 확인

이제 프론트에서 로그인 요청 시 `/api/auth/login` 으로 이메일/비밀번호를 전송하면,  
JWT 토큰이 응답으로 내려오고, 이후 API 요청 시 `Authorization: Bearer <token>` 헤더로 인증이 가능해진다.

---

## 🔚 마무리

JWT 개념부터 토큰 발급, 검증, Spring Security 연동까지 정리해봤다.

백엔드 서버가 인증 상태를 직접 저장하지 않고도 JWT만으로 안정적인 사용자 인증 처리를 수행할 수 있는 구조를 만들 수 있다.

보안이나 인증 관련 문제는 가장 중요하게 다뤄야 한다,, 개념을 확실히 이해하고 개발할 수 있도록 하자.

