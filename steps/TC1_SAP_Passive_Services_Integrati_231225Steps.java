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
    private String apiResponse;
    private String microservicesResponse;
    private String prenotesResponse;
    private String clearingResponse;
    private String currentCashResponse;
    private String cashComparisonResponse;
    private String fundsServicesResponse;
    private String luminaResponse;
    
    public SAPIntegrationSteps(WebDriver driver) {
        this.driver = driver;
        this.sapIntegrationPage = new SAPIntegrationPage(driver);
    }
    
    @Given("the test environment is configured with SAP services and Lumina integration")
    public void configureTestEnvironment() {
        sapIntegrationPage.navigateToEnvironmentConfig();
        sapIntegrationPage.verifyEnvironmentConfiguration();
    }
    
    @Given("the contract valuation API is operational")
    public void verifyValuationAPIOperational() {
        sapIntegrationPage.checkAPIStatus("valuationAPI");
    }
    
    @Given("microservices AGAS-21435 to AGAS-21806 are deployed")
    public void verifyMicroservicesDeployed() {
        sapIntegrationPage.checkMicroservicesStatus("AGAS-21435", "AGAS-21806");
    }
    
    @Given("SAP prenotes service is active")
    public void verifySAPPrenotesActive() {
        sapIntegrationPage.checkServiceStatus("sapPrenotes");
    }
    
    @Given("interbank clearing chamber is functional")
    public void verifyClearingChamberFunctional() {
        sapIntegrationPage.checkServiceStatus("clearingChamber");
    }
    
    @Given("Advisor module with currentCash is available")
    public void verifyAdvisorModuleAvailable() {
        sapIntegrationPage.checkServiceStatus("advisorCurrentCash");
    }
    
    @Given("a Natural Person contract exists in Private Banking with test data")
    public void verifyNaturalPersonContract() {
        sapIntegrationPage.navigateToContractManagement();
        sapIntegrationPage.verifyContractExists("NaturalPerson", "PrivateBanking");
    }
    
    @When("I invoke the contract valuation API for the Natural Person contract")
    public void invokeValuationAPI() {
        sapIntegrationPage.navigateToValuationAPI();
        sapIntegrationPage.selectContractType("NaturalPerson");
        sapIntegrationPage.selectBankingType("PrivateBanking");
        apiResponse = sapIntegrationPage.executeValuationAPI();
    }
    
    @Then("the API returns the expected total contract value")
    public void verifyAPIResponse() {
        assertNotNull("API response should not be null", apiResponse);
        assertTrue("API response should contain contract value", sapIntegrationPage.validateValuationResponse(apiResponse));
    }
    
    @When("I execute microservices AGAS-21435 to AGAS-21806")
    public void executeMicroservices() {
        sapIntegrationPage.navigateToMicroservicesPanel();
        microservicesResponse = sapIntegrationPage.executeMicroservicesRange("AGAS-21435", "AGAS-21806");
    }
    
    @Then("all microservices respond correctly and integrate properly")
    public void verifyMicroservicesResponse() {
        assertNotNull("Microservices response should not be null", microservicesResponse);
        assertTrue("All microservices should respond successfully", sapIntegrationPage.validateMicroservicesIntegration(microservicesResponse));
    }
    
    @When("I send requests to SAP prenotes service")
    public void sendPrenotesRequests() {
        sapIntegrationPage.navigateToSAPPrenotes();
        prenotesResponse = sapIntegrationPage.executePrenotesService();
    }
    
    @Then("the service returns consistent data")
    public void verifyPrenotesResponse() {
        assertNotNull("Prenotes response should not be null", prenotesResponse);
        assertTrue("Prenotes data should be consistent", sapIntegrationPage.validatePrenotesConsistency(prenotesResponse));
    }
    
    @When("I perform interbank clearing chamber tests")
    public void performClearingChamberTests() {
        sapIntegrationPage.navigateToClearingChamber();
        clearingResponse = sapIntegrationPage.executeClearingOperation();
    }
    
    @Then("operations reconciliation is completed successfully")
    public void verifyClearingReconciliation() {
        assertNotNull("Clearing response should not be null", clearingResponse);
        assertTrue("Reconciliation should be successful", sapIntegrationPage.validateReconciliation(clearingResponse));
    }
    
    @When("I validate the Advisor currentCash module with associated Mexdolar account")
    public void validateCurrentCashModule() {
        sapIntegrationPage.navigateToAdvisorModule();
        sapIntegrationPage.selectAccountType("Mexdolar");
        currentCashResponse = sapIntegrationPage.executeCurrentCashValidation();
    }
    
    @Then("the module processes the Mexdolar account correctly")
    public void verifyCurrentCashProcessing() {
        assertNotNull("CurrentCash response should not be null", currentCashResponse);
        assertTrue("Mexdolar account should be processed correctly", sapIntegrationPage.validateMexdolarProcessing(currentCashResponse));
    }
    
    @When("I compare blocked cash with cash in transit")
    public void compareCashStatus() {
        sapIntegrationPage.navigateToCashComparison();
        cashComparisonResponse = sapIntegrationPage.executeBlockedVsTransitComparison();
    }
    
    @Then("the difference is recorded correctly in the system")
    public void verifyCashDifference() {
        assertNotNull("Cash comparison response should not be null", cashComparisonResponse);
        assertTrue("Cash difference should be recorded correctly", sapIntegrationPage.validateCashDifferenceRecording(cashComparisonResponse));
    }
    
    @When("I review the response structure of debt, coverage and equity funds services")
    public void reviewFundsServicesStructure() {
        sapIntegrationPage.navigateToFundsServices();
        fundsServicesResponse = sapIntegrationPage.executeFundsServicesQuery();
    }
    
    @Then("the structure meets the expected format and contains valid data")
    public void verifyFundsServicesStructure() {
        assertNotNull("Funds services response should not be null", fundsServicesResponse);
        assertTrue("Response structure should meet expected format", sapIntegrationPage.validateFundsStructure(fundsServicesResponse));
    }
    
    @When("I test Lumina integration verifying operations")
    public void testLuminaIntegration() {
        sapIntegrationPage.navigateToLuminaIntegration();
        luminaResponse = sapIntegrationPage.executeLuminaOperations();
    }
    
    @Then("operations are reflected timely and coherently in Lumina")
    public void verifyLuminaIntegration() {
        assertNotNull("Lumina response should not be null", luminaResponse);
        assertTrue("Operations should be reflected correctly in Lumina", sapIntegrationPage.validateLuminaOperations(luminaResponse));
    }
    
    @When("I verify the total contract value component display in Acticenter")
    public void verifyActicenterDisplay() {
        sapIntegrationPage.navigateToActicenter();
        sapIntegrationPage.searchContract("NaturalPerson", "PrivateBanking");
    }
    
    @Then("the component shows the correct total contract value for Natural Person in Private Banking")
    public void verifyContractValueDisplay() {
        assertTrue("Contract value should be displayed correctly", sapIntegrationPage.validateContractValueDisplay());
    }
}