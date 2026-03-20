package com.tuan.portfolio.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // 1. Lấy Token từ Header của Request
            String jwt = getJwtFromRequest(request);

            // 2. Kiểm tra xem Token có chữ không và có hợp lệ không
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {

                // 3. Lấy tên tài khoản từ Token
                String username = tokenProvider.getUsernameFromJWT(jwt);

                // 4. Lấy thông tin chi tiết của tài khoản từ Memory
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // 5. Đóng gói thông tin xác thực
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 6. Lưu vào Security Context (Báo cho Spring biết là ông này đã có vé, cho qua!)
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            System.err.println("Không thể thiết lập xác thực người dùng trong Security Context: " + ex.getMessage());
        }

        // Cho phép Request đi tiếp tới Controller
        filterChain.doFilter(request, response);
    }

    // Hàm phụ trợ: Bóc tách Token từ Header
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        // Token gửi lên sẽ có dạng: "Bearer eyJhbGciOi..."
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Cắt bỏ 7 ký tự "Bearer " để lấy lõi Token
        }
        return null;
    }
}