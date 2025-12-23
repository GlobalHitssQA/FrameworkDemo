package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.LoginPage;
import pages.AdvisorModulePage;
import pages.ContractValuePage;
import static org.junit.Assert.*;

public class ContractValueSteps {
    private WebDriver driver;
    private LoginPage loginPage;
    private AdvisorModulePage advisorModulePage;
    private ContractValuePage contractValuePage;

    public ContractValueSteps(WebDriver driver) {
        this.driver = driver;
        this.loginPage = new LoginPage(driver);
        this.advisorModulePage = new AdvisorModulePage(driver);
        this.contractValuePage = new ContractValuePage(driver);
    }

    @Given("the user is authenticated in Acticenter as a wealth management advisor")
    public void userIsAuthenticated() {
        driver.get("https://acticenter.example.com");
    }

    @Given("there is an Individual Person Bank contract available with valuation information")
    public void contractAvailable() {
        // Precondition validation
    }

    @Given("the SAP Pasivos integration is working correctly")
    public void sapIntegrationWorking() {
        // Precondition validation
    }

    @Given("the advisor has logged into Acticenter")
    public void advisorLogin() {
        loginPage.login("advisor_user", "password");
        assertTrue("Login successful", loginPage.isLoginSuccessful());
    }

    @When("the advisor selects an Individual Person Bank contract from the Advisor module")
    public void selectContract() {
        advisorModulePage.selectIndividualPersonBankContract();
    }

    @Then("the system displays the selected contract information")
    public void verifyContractDisplayed() {
        assertTrue("Contract information displayed", contractValuePage.isContractInformationDisplayed());
    }

    @And("the total contract value component shows the accumulated monetary value at review date")
    public void verifyTotalValueComponent() {
        assertTrue("Total value component visible", contractValuePage.isTotalValueComponentVisible());
        assertNotNull("Total value displayed", contractValuePage.getTotalValueAmount());
    }

    @When("the advisor clicks on the total value component")
    public void clickTotalValueComponent() {
        contractValuePage.clickTotalValueComponent();
    }

    @Then("a pop-up displays with the complete breakdown")
    public void verifyPopupDisplayed() {
        assertTrue("Breakdown popup displayed", contractValuePage.isBreakdownPopupVisible());
    }

    @And("the breakdown shows the following items: Cash MXN, Cash USD, Pending settlements, Debt funds, Hedge funds, Equity funds, CDs and promissory notes, Money market, Capital market")
    public void verifyBreakdownItems() {
        assertTrue("Cash MXN present", contractValuePage.isCashMXNPresent());
        assertTrue("Cash USD present", contractValuePage.isCashUSDPresent());
        assertTrue("Pending settlements present", contractValuePage.isPendingSettlementsPresent());
        assertTrue("Debt funds present", contractValuePage.isDebtFundsPresent());
        assertTrue("Hedge funds present", contractValuePage.isHedgeFundsPresent());
        assertTrue("Equity funds present", contractValuePage.isEquityFundsPresent());
        assertTrue("CDs and promissory notes present", contractValuePage.isCDsAndNotesPresent());
        assertTrue("Money market present", contractValuePage.isMoneyMarketPresent());
        assertTrue("Capital market present", contractValuePage.isCapitalMarketPresent());
    }

    @And("the Cash MXN field displays the correct balance from the contract's main account obtained from SAP Pasivos service")
    public void verifyCashMXNBalance() {
        String cashMXN = contractValuePage.getCashMXNValue();
        assertNotNull("Cash MXN value present", cashMXN);
        assertTrue("Cash MXN value valid", cashMXN.matches("\\$[0-9,]+\\.[0-9]{2}"));
    }

    @And("the breakdown list is correctly aligned vertically with the total contract value component")
    public void verifyVerticalAlignment() {
        assertTrue("Vertical alignment correct", contractValuePage.isBreakdownAlignedWithTotalValue());
    }

    @When("the advisor clicks outside the component")
    public void clickOutsideComponent() {
        contractValuePage.clickOutsidePopup();
    }

    @Then("the breakdown pop-up closes correctly")
    public void verifyPopupClosed() {
        assertFalse("Breakdown popup closed", contractValuePage.isBreakdownPopupVisible());
    }
}