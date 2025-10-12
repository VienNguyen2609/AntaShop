package org.anta.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    private static final String SECRET = "mysecretkeymysecretkeymysecretkey123";

    private static final long ACCESS_EXPIRATION = 1000 * 60 * 15;

    private static final long REFRESH_EXPIRATION = 1000L * 60 * 60 * 24 * 7;

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateAccessToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .claim("type", "access")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .claim("type", "refresh")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public List<String> extractRoles(String token) {
        Object roleClaim = extractClaims(token).get("role");
        if (roleClaim instanceof String) {
            return List.of((String) roleClaim);
        }
        if (roleClaim instanceof List<?>) {
            return ((List<?>) roleClaim).stream()
                    .map(Object::toString)
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    public boolean isAccessToken(String token) {
        return "access".equals(extractClaims(token).get("type"));
    }

    public boolean isRefreshToken(String token) {
        return "refresh".equals(extractClaims(token).get("type"));
    }
}
