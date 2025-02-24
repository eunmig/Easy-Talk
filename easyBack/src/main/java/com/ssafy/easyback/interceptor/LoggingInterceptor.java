package com.ssafy.easyback.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.time.LocalDateTime;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
public class LoggingInterceptor implements HandlerInterceptor {

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    HttpSession session = request.getSession();
    session.setAttribute("userId", (Long) Long.valueOf("3300642563"));
    log.info("Request {} {} received at {}", request.getMethod(), request.getRequestURI(), LocalDateTime.now());
    return true;
  }
}