Feature: Contract Data Encryption Verification
  As a security tester
  I want to verify that all contract value and composition data is encrypted
  So that sensitive financial information is protected during transmission

  Scenario: Verify encrypted data transmission for contract value and composition component
    Given the network traffic inspection tool is configured and capturing traffic
    And I am authenticated in Acticenter with an active contract
    When I access the contract value and composition component
    Then all requests should use HTTPS protocol with TLS 1.2 or higher
    And no unencrypted HTTP transmissions containing contract data should be detected
    And packet contents should not be readable without decryption certificates