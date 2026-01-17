Feature: Shell In Pool and IZZIPAY Concurrent Execution Prevention

  Scenario: Verify Shell In Pool does not execute simultaneously with Shell IZZIPAY when sharing work tables
    Given the test environment is configured with shared tables between Shell In Pool and Shell IZZIPAY
    And the process control tables and temporary tables are available without active processes
    When the user executes the Shell IZZIPAY in the test environment
    Then the Shell IZZIPAY starts correctly and registers its process in the control table with a unique identifier
    When the user attempts to execute the Shell In Pool while IZZIPAY is running
    Then the system detects that shared tables are in use and Shell In Pool does not execute showing a blocking or waiting message
    When the user waits for Shell IZZIPAY to complete its execution
    Then the Shell IZZIPAY releases the shared tables and updates its status in the control table to finished
    When the user executes the Shell In Pool again after IZZIPAY has finished
    Then the Shell In Pool executes correctly without detecting conflict with IZZIPAY on shared tables