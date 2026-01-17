Feature: RED Elements Support for General Motors Life Cycle APNs

  Scenario: Verify RED elements support all 7 APNs for General Motors Life Cycle
    Given a General Motors line is provisioned with a productive RATEPLAN with 7 APNs enabled
    When I establish a data session using APN1 for telemetry traffic
    Then the RED elements allow the data session and telemetry traffic flows correctly
    When I establish data sessions sequentially using each of the 7 APNs
    Then each data session is successfully established for its corresponding APN
    When I verify the PCRF policies for each APN
    Then PCRF shows active and differentiated policies for each APN according to its use
    When I generate simultaneous traffic through multiple APNs from the same line
    Then RED elements support concurrent data sessions applying corresponding policies
    When I verify sessions for TESTING RATEPLAN with pre-productive APNs only
    Then RED elements only allow sessions for pre-productive APNs blocking productive ones