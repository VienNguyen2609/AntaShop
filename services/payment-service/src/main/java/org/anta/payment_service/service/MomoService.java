package org.anta.payment_service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.anta.payment_service.client.MomoAPI;
import org.anta.payment_service.dto.request.CreateMomoRequest;
import org.anta.payment_service.dto.response.CreateMomoResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MomoService {

    @Value(value = "MOMO")
    private String PARTNER_CODE;
    @Value(value = "F8BBA842ECF85")
    private String ACCESS_KEY;
    @Value(value = "K951B6PE1waDMi640xX08PD3vg6EkVlz")
    private String SECRET_KEY;
    @Value(value = "https://localhost:3000/")
    private String REDIRECT_URL;
    @Value(value = "http://localhost:8080/api/momo/ipn-handler")
    private String IPN_URL;
    @Value(value = "captureWallet")
    private String REQUEST_TYPE;


    private final MomoAPI momoAPI;

    public CreateMomoResponse createQR() {


        String orderId = UUID.randomUUID().toString();
        String orderInfo = "Thanh toan don hang" + orderId;
        String requestId = UUID.randomUUID().toString();
        String extraData = "Khong co khuyen mai";
        long amount = 100000;

        String rawSignature = String.format(
                "accessKey=%s&amount=%s&extraData=%s&ipnUrl=%s&orderId=%s&orderInfo=%s" +
                        "&partnerCode=%s&redirectUrl=%s&requestId=%s&requestType=%s",
                ACCESS_KEY, amount, extraData, IPN_URL, orderId, orderInfo,
                PARTNER_CODE, REDIRECT_URL, requestId, REQUEST_TYPE
        );

        String prettySignnature = "" ;
        try {
            prettySignnature = signHmacSHA256(rawSignature, SECRET_KEY);
            log.info("Signature: {}", prettySignnature);
        }catch (Exception e){
            log.error("Error while signing HMAC SHA256" + e);
            return null;
        }


        if(prettySignnature.isBlank()){
            log.error("Error while signing HMAC SHA256");
            return null;
        }
        CreateMomoRequest createMomoRequest = CreateMomoRequest.builder()
                .partnerCode(PARTNER_CODE)
                .requestType(REQUEST_TYPE)
                .ipnUrl(IPN_URL)
                .redirectUrl(REDIRECT_URL)
                .orderId(orderId)
                .amount(amount)
                .orderInfo(orderInfo)
                .requestId(requestId)
                .lang("vi")
                .extraData(extraData)
                .signature(prettySignnature)
                .build();
        return momoAPI.createMomoQR(createMomoRequest);
    }

    // HMAC SHA256 signing method
    // truyền dử liệu và key vào để mã hóa giữa client và server
    // dữ liệu truyền đi sẽ được mã hóa và chỉ có server mới giải mã được
    // đảm bảo tính toàn vẹn và bảo mật của dữ liệu không cho phép bên thứ 3 can thiệp
    private String signHmacSHA256(String data, String key) throws Exception {

        Mac hmacSHA256 = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "" +
                "HmacSHA256");
        hmacSHA256.init(secretKeySpec);
        byte[] hash = hmacSHA256.doFinal(data.getBytes(StandardCharsets.UTF_8));
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public String handleIPN(Map<String, String> allParams) {
       return momoAPI.handleIPN();
    }
}
