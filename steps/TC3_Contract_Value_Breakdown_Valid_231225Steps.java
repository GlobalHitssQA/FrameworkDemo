package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.ContractValueBreakdownPage;
import static org.junit.Assert.*;

public class ContractValueBreakdownSteps {
    private WebDriver driver;
    private ContractValueBreakdownPage contractPage;
    private String currentCashValue;
    private String cuentaEjeValue;

    public ContractValueBreakdownSteps(WebDriver driver) {
        this.driver = driver;
        this.contractPage = new ContractValueBreakdownPage(driver);
    }

    @Given("the user is authenticated in Acticenter")
    public void theUserIsAuthenticatedInActicenter() {
        contractPage.verifyUserAuthentication();
    }

    @Given("a Casa de Bolsa contract is available with currentCash balance")
    public void aCasaDeBolsaContractIsAvailableWithCurrentCashBalance() {
        assertTrue("Casa de Bolsa contract should be available", contractPage.isCasaDeBolsaContractAvailable());
    }

    @Given("a Banco contract is available with cuenta eje balance")
    public void aBancoContractIsAvailableWithCuentaEjeBalance() {
        assertTrue("Banco contract should be available", contractPage.isBancoContractAvailable());
    }

    @Given("the Asesor currentCash module is operational")
    public void theAsesorCurrentCashModuleIsOperational() {
        assertTrue("Asesor module should be operational", contractPage.isAsesorModuleOperational());
    }

    @Given("SAP Pasivos services are available for cuenta eje consultation")
    public void sapPasivosServicesAreAvailableForCuentaEjeConsultation() {
        assertTrue("SAP Pasivos should be available", contractPage.isSAPPasivosAvailable());
    }

    @When("the user navigates to Acticenter and selects a Casa de Bolsa contract")
    public void theUserNavigatesToActicenterAndSelectsACasaDeBolsaContract() {
        contractPage.selectCasaDeBolsaContract();
    }

    @Then("the total contract value component is displayed")
    public void theTotalContractValueComponentIsDisplayed() {
        assertTrue("Total contract value should be displayed", contractPage.isTotalValueComponentDisplayed());
    }

    @When("the user opens the contract value breakdown for Casa de Bolsa")
    public void theUserOpensTheContractValueBreakdownForCasaDeBolsa() {
        contractPage.openValueBreakdownPopup();
    }

    @Then("the breakdown popup is displayed completely")
    public void theBreakdownPopupIsDisplayedCompletely() {
        assertTrue("Breakdown popup should be displayed", contractPage.isBreakdownPopupDisplayed());
    }

    @And("the Poder de compra MXN item is visible with the correct currentCash value from Asesor module")
    public void thePoderDeCompraMXNItemIsVisibleWithTheCorrectCurrentCashValue() {
        assertTrue("Poder de compra MXN should be visible", contractPage.isPoderDeCompraMXNDisplayed());
        currentCashValue = contractPage.getPoderDeCompraMXNValue();
        assertTrue("Poder de compra MXN value should match currentCash", contractPage.validatePoderDeCompraValue(currentCashValue));
    }

    @And("the Efectivo MXN item is not displayed in the breakdown")
    public void theEfectivoMXNItemIsNotDisplayedInTheBreakdown() {
        assertFalse("Efectivo MXN should not be displayed for Casa de Bolsa", contractPage.isEfectivoMXNDisplayed());
    }

    @When("the user closes the popup and selects a Banco contract")
    public void theUserClosesThePopupAndSelectsABancoContract() {
        contractPage.closeBreakdownPopup();
        contractPage.selectBancoContract();
    }

    @Then("the Banco contract is selected and total value component is displayed")
    public void theBancoContractIsSelectedAndTotalValueComponentIsDisplayed() {
        assertTrue("Banco contract should be selected", contractPage.isBancoContractSelected());
        assertTrue("Total value component should be displayed", contractPage.isTotalValueComponentDisplayed());
    }

    @When("the user opens the contract value breakdown for Banco")
    public void theUserOpensTheContractValueBreakdownForBanco() {
        contractPage.openValueBreakdownPopup();
    }

    @And("the Efectivo MXN item is visible with the correct cuenta eje balance")
    public void theEfectivoMXNItemIsVisibleWithTheCorrectCuentaEjeBalance() {
        assertTrue("Efectivo MXN should be visible", contractPage.isEfectivoMXNDisplayed());
        cuentaEjeValue = contractPage.getEfectivoMXNValue();
        assertTrue("Efectivo MXN value should match cuenta eje balance", contractPage.validateEfectivoMXNValue(cuentaEjeValue));
    }

    @And("the Poder de compra MXN item is not displayed in the breakdown")
    public void thePoderDeCompraMXNItemIsNotDisplayedInTheBreakdown() {
        assertFalse("Poder de compra MXN should not be displayed for Banco", contractPage.isPoderDeCompraMXNDisplayed());
    }

    @And("both financial items display correct monetary format with two decimals")
    public void bothFinancialItemsDisplayCorrectMonetaryFormatWithTwoDecimals() {
        assertTrue("Monetary format should be correct", contractPage.validateMonetaryFormat());
    }
}