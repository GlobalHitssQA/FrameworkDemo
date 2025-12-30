package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.LoginPage;
import pages.ContractPage;
import pages.BreakdownPage;
import static org.junit.Assert.*;

public class PendingSettlementsSteps {
    
    private Page page;
    private LoginPage loginPage;
    private ContractPage contractPage;
    private BreakdownPage breakdownPage;
    private String casaDeBolsaPendingValue;
    private String bankPendingValue;
    
    public PendingSettlementsSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.contractPage = new ContractPage(page);
        this.breakdownPage = new BreakdownPage(page);
    }
    
    @Given("user logs in to Acticenter with valid credentials")
    public void userLogsInToActicenterWithValidCredentials() {
        loginPage.navigateToLoginPage();
        loginPage.enterUsername(System.getenv("ACTICENTER_USERNAME"));
        loginPage.enterPassword(System.getenv("ACTICENTER_PASSWORD"));
        loginPage.clickLoginButton();
        assertTrue("User should be logged in", loginPage.isLoggedIn());
    }
    
    @When("user selects a Casa de Bolsa contract with pending settlements")
    public void userSelectsCasaDeBolsaContractWithPendingSettlements() {
        contractPage.openContractSelector();
        contractPage.selectCasaDeBolsaContract();
        assertTrue("Contract value component should be visible", contractPage.isValueComponentVisible());
    }
    
    @And("user clicks on the contract value component")
    public void userClicksOnContractValueComponent() {
        contractPage.clickValueComponent();
    }
    
    @Then("the breakdown popup displays all applicable items")
    public void breakdownPopupDisplaysAllApplicableItems() {
        assertTrue("Breakdown popup should be visible", breakdownPage.isBreakdownPopupVisible());
        assertTrue("Breakdown should display all items", breakdownPage.areAllItemsDisplayed());
    }
    
    @And("the Pendientes por liquidar field displays the accumulated monetary value")
    public void pendientesPorLiquidarFieldDisplaysAccumulatedMonetaryValue() {
        assertTrue("Pendientes por liquidar field should be visible", breakdownPage.isPendingSettlementsFieldVisible());
        casaDeBolsaPendingValue = breakdownPage.getPendingSettlementsValue();
        assertTrue("Pending settlements value should be a valid monetary amount", breakdownPage.isValidMonetaryValue(casaDeBolsaPendingValue));
        breakdownPage.closeBreakdownPopup();
    }
    
    @When("user selects a bank contract with pending settlements")
    public void userSelectsBankContractWithPendingSettlements() {
        contractPage.openContractSelector();
        contractPage.selectBankContract();
        assertTrue("Contract value component should be visible", contractPage.isValueComponentVisible());
        contractPage.clickValueComponent();
    }
    
    @Then("the breakdown popup displays pending settlements for bank contract")
    public void breakdownPopupDisplaysPendingSettlementsForBankContract() {
        assertTrue("Breakdown popup should be visible", breakdownPage.isBreakdownPopupVisible());
        assertTrue("Pendientes por liquidar field should be visible", breakdownPage.isPendingSettlementsFieldVisible());
    }
    
    @And("the Pendientes por liquidar calculation is consistent with Casa de Bolsa contract")
    public void pendientesPorLiquidarCalculationIsConsistentWithCasaDeBolsaContract() {
        bankPendingValue = breakdownPage.getPendingSettlementsValue();
        assertTrue("Bank pending settlements value should be a valid monetary amount", breakdownPage.isValidMonetaryValue(bankPendingValue));
        assertTrue("Pending settlements format should be consistent across contract types", breakdownPage.isFormatConsistent(casaDeBolsaPendingValue, bankPendingValue));
        breakdownPage.closeBreakdownPopup();
    }
    
    @When("user selects a contract with no pending settlements")
    public void userSelectsContractWithNoPendingSettlements() {
        contractPage.openContractSelector();
        contractPage.selectContractWithNoPendingSettlements();
        assertTrue("Contract value component should be visible", contractPage.isValueComponentVisible());
        contractPage.clickValueComponent();
    }
    
    @Then("the Pendientes por liquidar field displays value of zero")
    public void pendientesPorLiquidarFieldDisplaysValueOfZero() {
        assertTrue("Breakdown popup should be visible", breakdownPage.isBreakdownPopupVisible());
        String zeroValue = breakdownPage.getPendingSettlementsValue();
        assertTrue("Pending settlements should display zero value", breakdownPage.isZeroValue(zeroValue));
        breakdownPage.closeBreakdownPopup();
    }
}