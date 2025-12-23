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
    private String mainAccountValue;

    public ContractValueBreakdownSteps(WebDriver driver) {
        this.driver = driver;
        this.contractPage = new ContractValueBreakdownPage(driver);
    }

    @Given("the user is authenticated in Acticenter")
    public void userIsAuthenticated() {
        contractPage.navigateToActicenter();
        contractPage.login();
    }

    @And("a Brokerage House contract is available with currentCash balance")
    public void brokerageContractAvailable() {
        assertTrue("Brokerage contract should be available", contractPage.isBrokerageContractAvailable());
    }

    @And("a Bank contract is available with main account balance")
    public void bankContractAvailable() {
        assertTrue("Bank contract should be available", contractPage.isBankContractAvailable());
    }

    @And("the currentCash Advisor Module is operational")
    public void advisorModuleOperational() {
        assertTrue("Advisor module should be operational", contractPage.isAdvisorModuleOperational());
    }

    @And("SAP Passive Services are available for main account query")
    public void sapServicesAvailable() {
        assertTrue("SAP services should be available", contractPage.areSAPServicesAvailable());
    }

    @Given("the user enters Acticenter and selects a Brokerage House contract")
    public void selectBrokerageContract() {
        contractPage.selectContractType("Brokerage");
    }

    @When("the contract total value component is displayed")
    public void contractValueDisplayed() {
        assertTrue("Contract value component should be visible", contractPage.isContractValueComponentVisible());
    }

    @And("the user opens the contract value breakdown for Brokerage House")
    public void openBrokerageBreakdown() {
        contractPage.openContractBreakdown();
    }

    @Then("the popup with complete breakdown is displayed")
    public void breakdownPopupDisplayed() {
        assertTrue("Breakdown popup should be displayed", contractPage.isBreakdownPopupVisible());
    }

    @And("the Purchasing Power MXN item is visible")
    public void purchasingPowerVisible() {
        assertTrue("Purchasing Power MXN should be visible", contractPage.isPurchasingPowerMXNVisible());
    }

    @And("the Purchasing Power MXN shows the correct currentCash value from Advisor Module")
    public void validatePurchasingPowerValue() {
        currentCashValue = contractPage.getCurrentCashFromAdvisor();
        String displayedValue = contractPage.getPurchasingPowerMXNValue();
        assertEquals("Purchasing Power MXN value should match currentCash", currentCashValue, displayedValue);
    }

    @And("the Cash MXN item is not displayed in the Brokerage House contract")
    public void cashMXNNotVisibleInBrokerage() {
        assertFalse("Cash MXN should not be visible in Brokerage contract", contractPage.isCashMXNVisible());
    }

    @When("the user closes the popup and selects a Bank contract")
    public void closeAndSelectBankContract() {
        contractPage.closeBreakdownPopup();
        contractPage.selectContractType("Bank");
    }

    @Then("the Bank contract is selected and the total value component is displayed")
    public void bankContractSelected() {
        assertTrue("Bank contract should be selected", contractPage.isBankContractSelected());
        assertTrue("Contract value component should be visible", contractPage.isContractValueComponentVisible());
    }

    @When("the user opens the contract value breakdown for Bank")
    public void openBankBreakdown() {
        contractPage.openContractBreakdown();
    }

    @And("the Cash MXN item is visible")
    public void cashMXNVisible() {
        assertTrue("Cash MXN should be visible", contractPage.isCashMXNVisible());
    }

    @And("the Cash MXN shows the correct main account balance")
    public void validateCashMXNValue() {
        mainAccountValue = contractPage.getMainAccountBalance();
        String displayedValue = contractPage.getCashMXNValue();
        assertEquals("Cash MXN value should match main account balance", mainAccountValue, displayedValue);
    }

    @And("the Purchasing Power MXN item is not displayed in the Bank contract")
    public void purchasingPowerNotVisibleInBank() {
        assertFalse("Purchasing Power MXN should not be visible in Bank contract", contractPage.isPurchasingPowerMXNVisible());
    }

    @And("both items display values with correct currency format with two decimals")
    public void validateCurrencyFormat() {
        String regex = "^\\$?[0-9]{1,3}(,[0-9]{3})*\\.[0-9]{2}$";
        if (contractPage.isPurchasingPowerMXNVisible()) {
            String value = contractPage.getPurchasingPowerMXNValue();
            assertTrue("Purchasing Power should have correct currency format", value.matches(regex));
        }
        if (contractPage.isCashMXNVisible()) {
            String value = contractPage.getCashMXNValue();
            assertTrue("Cash MXN should have correct currency format", value.matches(regex));
        }
    }
}