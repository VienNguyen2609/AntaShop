package org.anta.service;

import lombok.RequiredArgsConstructor;
import org.anta.dto.request.AddressRequest;
import org.anta.dto.response.AddressResponse;
import org.anta.mapper.AddressMapper;
import org.anta.repository.AddressRepository;
import org.anta.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final AddressMapper addressMapper;

    public List<AddressResponse> getAddressById(Long userId){
        return addressRepository.findByUserId(userId)
                .stream()
                .map(addressMapper::toResponse)
                .toList();
    }

    public AddressResponse add(Long userId, AddressRequest addressRequest){
        var user  = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        var address = addressMapper.toEntity(addressRequest);
        address.setUser(user);

        var savedAddress = addressRepository.save(address);

        return addressMapper.toResponse(savedAddress);
    }

    public AddressResponse update(Long addressId , Long userId, AddressRequest addressRequest){

        var address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if(!address.getUser().getId().equals(userId)){
            throw new RuntimeException("You cannot update another user's address");
        }

        address.setAddressLine(addressRequest.getAddressLine());
        address.setCity(addressRequest.getCity());
        address.setDistrict(addressRequest.getDistrict());
        address.setWard(addressRequest.getWard());
        address.setPostalCode(addressRequest.getPostalCode());
        address.setIsDefault(addressRequest.getIsDefault());

        var updatedAddress = addressRepository.save(address);

        return addressMapper.toResponse(updatedAddress);
    }

    public void delete(Long addressId , Long userId){

        var address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if(!address.getUser().getId().equals(userId)){
            throw new RuntimeException("You cannot delete another user's address");
        }
        addressRepository.delete(address);
    }
}
