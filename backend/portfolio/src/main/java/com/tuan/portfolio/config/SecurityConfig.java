package com.tuan.portfolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.tuan.portfolio.security.JwtAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, com.tuan.portfolio.security.JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
                .cors(org.springframework.security.config.Customizer.withDefaults())
                //  chúng ta dùng Token (JWT) chứ không dùng Session nên tắt CSRF
                .csrf(csrf -> csrf.disable())

                // Không lưu trạng thái trên server
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Phân quyền cho từng đường dẫn (URL)
                .authorizeHttpRequests(auth -> auth
                        // 1. CÁC CỬA MỞ CHO KHÁCH (Public)
                        .requestMatchers(HttpMethod.GET, "/api/profile", "/api/projects", "/api/skills").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/messages").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()

                        // 2. CÁC CỬA BỊ KHÓA (Phải có Token mới vào được)
                        // Bất kỳ Request nào khác (như POST, PUT, DELETE vào projects, profile) đều phải xác thực
                        .anyRequest().authenticated()
                );


        // Thêm bộ lọc JWT vào chuỗi lọc của Spring Security
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // Bean này dùng để mã hóa mật khẩu
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public org.springframework.security.core.userdetails.UserDetailsService userDetailsService() {
        org.springframework.security.core.userdetails.UserDetails admin =
                org.springframework.security.core.userdetails.User.builder()
                        .username("tuan123")
                        .password(passwordEncoder().encode("Tuan@123"))
                        .roles("ADMIN")
                        .build();

        return new org.springframework.security.provisioning.InMemoryUserDetailsManager(admin);
    }


    @Bean
    public org.springframework.security.authentication.AuthenticationManager authenticationManager(
            org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}