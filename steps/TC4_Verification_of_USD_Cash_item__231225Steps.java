package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.ActicenterContractPage;
import static org.junit.Assert.*;

public class USDCashVerificationSteps {
    private WebDriver driver;
    private ActicenterContractPage contractPage;
    private String expectedUSDAmount;

    public USDCashVerificationSteps(WebDriver driver) {
        this.driver = driver;
        this.contractPage = new ActicenterContractPage(driver);
    }

    @Given("the user is authenticated in Acticenter")
    public void userIsAuthenticated() {
        contractPage.navigateToActicenter();
        contractPage.login();
    }

    @Given("SAP Pasivos service is operational")
    public void sapPasivosServiceIsOperational() {
        // Verification that SAP service is available
        assertTrue("SAP Pasivos service should be operational", contractPage.verifySAPServiceStatus());
    }

    @Given("AGAS-21806 microservice is implemented")
    public void agasMicroserviceIsImplemented() {
        // Verification that AGAS microservice is available
        assertTrue("AGAS-21806 microservice should be implemented", contractPage.verifyAGASMicroserviceStatus());
    }

    @Given("a Banco Persona Moral contract with associated Mexdolar account is available")
    public void bancoPersonaMoralContractWithMexdolarAvailable() {
        expectedUSDAmount = contractPage.getMexdolarBalanceFromSAP();
    }

    @Given("a Banco Persona Fisica contract without Mexdolar account is available")
    public void bancoPersonaFisicaContractWithoutMexdolarAvailable() {
        // Contract without Mexdolar is ready for selection
    }

    @Given("a Casa de Bolsa contract with dollar currency amount is available")
    public void casaDeBolsaContractWithDollarCurrencyAvailable() {
        expectedUSDAmount = contractPage.getCasaDeBolsaDollarAmount();
    }

    @Given("a contract with no dollar balance is available")
    public void contractWithNoDollarBalanceAvailable() {
        expectedUSDAmount = "$0.00";
    }

    @When("the user selects the contract")
    public void userSelectsContract() {
        contractPage.selectBancoPersonaMoralContractWithMexdolar();
    }

    @When("the user selects the contract without Mexdolar")
    public void userSelectsContractWithoutMexdolar() {
        contractPage.selectBancoContractWithoutMexdolar();
    }

    @When("the user selects the Casa de Bolsa contract")
    public void userSelectsCasaDeBolsaContract() {
        contractPage.selectCasaDeBolsaContract();
    }

    @When("the user opens the contract value breakdown")
    public void userOpensContractValueBreakdown() {
        contractPage.clickContractValueComponent();
        contractPage.waitForBreakdownPopup();
    }

    @Then("the USD Cash item should be visible")
    public void usdCashItemShouldBeVisible() {
        assertTrue("USD Cash item should be visible", contractPage.isUSDCashItemVisible());
    }

    @Then("the USD Cash amount should match the Mexdolar account balance from SAP")
    public void usdCashAmountShouldMatchMexdolarBalance() {
        String actualAmount = contractPage.getUSDCashAmount();
        assertEquals("USD Cash amount should match SAP Mexdolar balance", expectedUSDAmount, actualAmount);
    }

    @Then("the USD Cash item should not be visible in the breakdown")
    public void usdCashItemShouldNotBeVisible() {
        assertFalse("USD Cash item should not be visible", contractPage.isUSDCashItemVisible());
    }

    @Then("the USD Cash amount should match the contract dollar amount")
    public void usdCashAmountShouldMatchContractDollarAmount() {
        String actualAmount = contractPage.getUSDCashAmount();
        assertEquals("USD Cash amount should match Casa de Bolsa dollar amount", expectedUSDAmount, actualAmount);
    }

    @Then("the USD Cash item should display \"$0.00\"")
    public void usdCashItemShouldDisplayZero() {
        String actualAmount = contractPage.getUSDCashAmount();
        assertEquals("USD Cash should display $0.00", "$0.00", actualAmount);
    }
}