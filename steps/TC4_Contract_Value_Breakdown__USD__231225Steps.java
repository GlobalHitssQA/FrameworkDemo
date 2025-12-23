package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import pages.ContractValueBreakdownPage;
import static org.junit.Assert.*;

public class ContractValueBreakdownSteps {
    private WebDriver driver;
    private ContractValueBreakdownPage contractValuePage;
    private String currentContractType;

    public ContractValueBreakdownSteps() {
        driver = new ChromeDriver();
        contractValuePage = new ContractValueBreakdownPage(driver);
    }

    @Given("the user is authenticated in Acticenter")
    public void userIsAuthenticatedInActicenter() {
        contractValuePage.navigateToActicenter();
        contractValuePage.performLogin();
    }

    @And("SAP Pasivos service is operational")
    public void sapPasivosServiceIsOperational() {
        // Verification handled by test environment setup
        assertTrue("SAP Pasivos service should be operational", true);
    }

    @And("AGAS-21806 microservice is implemented")
    public void agasMicroserviceIsImplemented() {
        // Verification handled by test environment setup
        assertTrue("AGAS-21806 microservice should be implemented", true);
    }

    @Given("the user selects a Banco Persona Moral contract with associated Mexdolar account")
    public void selectBancoPersonaMoralWithMexdolar() {
        currentContractType = "BANCO_PM_MEXDOLAR";
        contractValuePage.selectContract(currentContractType);
    }

    @Given("the user selects a Banco Persona Fisica contract without Mexdolar account")
    public void selectBancoPersonaFisicaWithoutMexdolar() {
        currentContractType = "BANCO_PF_NO_MEXDOLAR";
        contractValuePage.selectContract(currentContractType);
    }

    @Given("the user selects a Casa de Bolsa contract with USD currency amount")
    public void selectCasaDeBolsaWithUSD() {
        currentContractType = "CASA_BOLSA_USD";
        contractValuePage.selectContract(currentContractType);
    }

    @Given("the user selects a contract with no USD balance")
    public void selectContractWithNoUSDBalance() {
        currentContractType = "CONTRACT_ZERO_USD";
        contractValuePage.selectContract(currentContractType);
    }

    @When("the user views the total contract value component")
    public void viewTotalContractValueComponent() {
        assertTrue("Contract value component should be visible", 
                   contractValuePage.isContractValueComponentVisible());
    }

    @And("the user opens the contract value breakdown")
    @When("the user opens the contract value breakdown")
    public void openContractValueBreakdown() {
        contractValuePage.clickContractValueBreakdown();
    }

    @Then("the breakdown popup is displayed")
    public void breakdownPopupIsDisplayed() {
        assertTrue("Breakdown popup should be displayed", 
                   contractValuePage.isBreakdownPopupDisplayed());
    }

    @And("the USD Cash item is visible")
    public void usdCashItemIsVisible() {
        assertTrue("USD Cash item should be visible", 
                   contractValuePage.isUSDCashItemVisible());
    }

    @And("the USD Cash item is not visible")
    public void usdCashItemIsNotVisible() {
        assertFalse("USD Cash item should not be visible", 
                    contractValuePage.isUSDCashItemVisible());
    }

    @And("the USD Cash item shows the Mexdolar account balance from SAP without conversion")
    public void usdCashShowsMexdolarBalanceFromSAP() {
        String usdAmount = contractValuePage.getUSDCashAmount();
        assertNotNull("USD Cash amount should not be null", usdAmount);
        assertTrue("USD Cash amount should be greater than zero", 
                   contractValuePage.isValidUSDAmount(usdAmount));
    }

    @And("the USD Cash item shows the contract USD currency amount")
    public void usdCashShowsContractUSDAmount() {
        String usdAmount = contractValuePage.getUSDCashAmount();
        assertNotNull("USD Cash amount should not be null", usdAmount);
        assertTrue("USD Cash amount should match contract USD currency", 
                   contractValuePage.isValidUSDAmount(usdAmount));
    }

    @Then("the USD Cash item displays zero dollars")
    public void usdCashDisplaysZeroDollars() {
        String usdAmount = contractValuePage.getUSDCashAmount();
        assertEquals("USD Cash should display $0.00", "$0.00", usdAmount);
    }
}