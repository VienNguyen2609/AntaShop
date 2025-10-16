package org.anta.payment_service.controller;



import lombok.RequiredArgsConstructor;
import org.anta.payment_service.constant.MomoParameter;
import org.anta.payment_service.service.MomoService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/momo")
public class MomoController {

    private final MomoService momoService;

    @PostMapping("/create")
    public Object createMomoQR() {
        return momoService.createQR();

    }

   @GetMapping("/ipn-handler")
    public String handleIPN(@RequestParam Map<String, String> allParams) {

        Integer resultCode = Integer.parseInt(allParams.get(MomoParameter.RESULT_CODE));
        if (resultCode != 0) {
            return "Payment failed with result code: " + resultCode;
        }

        return "Payment successful";
    }
}
