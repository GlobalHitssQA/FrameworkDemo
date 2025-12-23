package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import org.openqa.selenium.WebDriver;
import pages.SAPIntegrationPage;
import static org.junit.Assert.*;

public class SAPIntegrationSteps {
    private WebDriver driver;
    private SAPIntegrationPage sapIntegrationPage;
    private String valuationResponse;
    private String microservicesResponse;
    private String prenotesResponse;
    private String clearingResponse;
    private String currentCashResponse;
    private String cashComparisonResponse;
    private String fundsResponse;
    private String luminaResponse;
    private String contractValueDisplay;

    public SAPIntegrationSteps(WebDriver driver) {
        this.driver = driver;
        this.sapIntegrationPage = new SAPIntegrationPage(driver);
    }

    @Given("the test environment is configured with access to all required services")
    public void theTestEnvironmentIsConfigured() {
        sapIntegrationPage.navigateToTestEnvironment();
        assertTrue("Environment not ready", sapIntegrationPage.isEnvironmentReady());
    }

    @Given("SAP Passive services are available")
    public void sapPassiveServicesAreAvailable() {
        assertTrue("SAP Passive services unavailable", sapIntegrationPage.verifySAPPassiveServices());
    }

    @Given("the contract valuation API is operational")
    public void theContractValuationAPIIsOperational() {
        assertTrue("Valuation API not operational", sapIntegrationPage.verifyValuationAPIStatus());
    }

    @Given("microservices AGAS-21435 to AGAS-21806 are implemented")
    public void microservicesAGASAreImplemented() {
        assertTrue("AGAS microservices not available", sapIntegrationPage.verifyAGASMicroservices());
    }

    @Given("SAP pre-notes service is active")
    public void sapPrenotesServiceIsActive() {
        assertTrue("SAP pre-notes service inactive", sapIntegrationPage.verifySAPPrenotesService());
    }

    @Given("the interbank clearing house is functional")
    public void theInterbankClearingHouseIsFunctional() {
        assertTrue("Clearing house not functional", sapIntegrationPage.verifyClearingHouse());
    }

    @Given("Advisor module with currentCash is available")
    public void advisorModuleWithCurrentCashIsAvailable() {
        assertTrue("Advisor module unavailable", sapIntegrationPage.verifyAdvisorModule());
    }

    @Given("Individual client contract in Private Banking with test data exists")
    public void individualClientContractExists() {
        assertTrue("Test contract not found", sapIntegrationPage.verifyTestContract());
    }

    @Given("integration with Lumina is established")
    public void integrationWithLuminaIsEstablished() {
        assertTrue("Lumina integration not established", sapIntegrationPage.verifyLuminaIntegration());
    }

    @Given("I prepare the test environment with necessary configuration for SAP services and Lumina integration")
    public void iPrepareTheTestEnvironment() {
        sapIntegrationPage.configureTestEnvironment();
        assertTrue("Configuration failed", sapIntegrationPage.isConfigurationComplete());
    }

    @When("I invoke the contract valuation API for an Individual client contract in Private Banking")
    public void iInvokeTheContractValuationAPI() {
        valuationResponse = sapIntegrationPage.invokeValuationAPI("INDIVIDUAL", "PRIVATE_BANKING");
        assertNotNull("Valuation response is null", valuationResponse);
    }

    @Then("the API returns the expected total contract value information")
    public void theAPIReturnsExpectedTotalContractValue() {
        assertTrue("Invalid valuation response", sapIntegrationPage.validateValuationResponse(valuationResponse));
    }

    @When("I execute microservices AGAS-21435 to AGAS-21806")
    public void iExecuteMicroservicesAGAS() {
        microservicesResponse = sapIntegrationPage.executeAGASMicroservices();
        assertNotNull("Microservices response is null", microservicesResponse);
    }

    @Then("all microservices respond correctly and integrate properly in the global response")
    public void allMicroservicesRespondCorrectly() {
        assertTrue("Microservices integration failed", sapIntegrationPage.validateMicroservicesIntegration(microservicesResponse));
    }

    @When("I send requests to the SAP pre-notes service")
    public void iSendRequestsToSAPPrenotesService() {
        prenotesResponse = sapIntegrationPage.sendPrenotesRequest();
        assertNotNull("Prenotes response is null", prenotesResponse);
    }

    @Then("the SAP pre-notes service returns consistent data")
    public void theSAPPrenotesServiceReturnsConsistentData() {
        assertTrue("Prenotes data inconsistent", sapIntegrationPage.validatePrenotesData(prenotesResponse));
    }

    @When("I perform interbank clearing house tests")
    public void iPerformInterbankClearingHouseTests() {
        clearingResponse = sapIntegrationPage.performClearingHouseTest();
        assertNotNull("Clearing response is null", clearingResponse);
    }

    @Then("the operations reconciliation is completed correctly")
    public void theOperationsReconciliationIsCompletedCorrectly() {
        assertTrue("Reconciliation failed", sapIntegrationPage.validateReconciliation(clearingResponse));
    }

    @When("I validate the Advisor currentCash module with associated Mexdolar account")
    public void iValidateTheAdvisorCurrentCashModule() {
        currentCashResponse = sapIntegrationPage.validateCurrentCashModule("MEXDOLAR");
        assertNotNull("CurrentCash response is null", currentCashResponse);
    }

    @Then("the module correctly processes the associated Mexdolar account")
    public void theModuleCorrectlyProcessesMexdolarAccount() {
        assertTrue("Mexdolar processing failed", sapIntegrationPage.validateMexdolarProcessing(currentCashResponse));
    }

    @When("I compare blocked cash with cash in transit")
    public void iCompareBlockedCashWithCashInTransit() {
        cashComparisonResponse = sapIntegrationPage.compareCashStatus();
        assertNotNull("Cash comparison response is null", cashComparisonResponse);
    }

    @Then("the difference is correctly recorded in the system")
    public void theDifferenceIsCorrectlyRecorded() {
        assertTrue("Cash difference not recorded", sapIntegrationPage.validateCashDifference(cashComparisonResponse));
    }

    @When("I review the response structure of debt, coverage and equity funds services")
    public void iReviewTheResponseStructureOfFundsServices() {
        fundsResponse = sapIntegrationPage.getFundsServicesResponse();
        assertNotNull("Funds response is null", fundsResponse);
    }

    @Then("the structure complies with the expected format and contains valid data")
    public void theStructureCompliesWithExpectedFormat() {
        assertTrue("Funds structure invalid", sapIntegrationPage.validateFundsStructure(fundsResponse));
    }

    @When("I test the integration with Lumina verifying operations")
    public void iTestTheIntegrationWithLumina() {
        luminaResponse = sapIntegrationPage.testLuminaIntegration();
        assertNotNull("Lumina response is null", luminaResponse);
    }

    @Then("the operations are reflected timely and consistently in Lumina")
    public void theOperationsAreReflectedInLumina() {
        assertTrue("Lumina operations not reflected", sapIntegrationPage.validateLuminaOperations(luminaResponse));
    }

    @When("I verify the contract total value component visualization in Acticenter")
    public void iVerifyTheContractTotalValueComponent() {
        sapIntegrationPage.navigateToActicenter();
        contractValueDisplay = sapIntegrationPage.getContractValueDisplay();
        assertNotNull("Contract value display is null", contractValueDisplay);
    }

    @Then("the component displays the contract total value correctly for Individual client in Private Banking")
    public void theComponentDisplaysContractTotalValueCorrectly() {
        assertTrue("Contract value display incorrect", sapIntegrationPage.validateContractValueDisplay(contractValueDisplay));
    }
}