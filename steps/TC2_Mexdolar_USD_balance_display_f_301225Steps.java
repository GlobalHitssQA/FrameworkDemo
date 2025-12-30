package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.LoginPage;
import pages.ContractSearchPage;
import pages.ContractBreakdownPage;
import static org.junit.Assert.*;

public class MexdolarBalanceSteps {

    private Page page;
    private LoginPage loginPage;
    private ContractSearchPage contractSearchPage;
    private ContractBreakdownPage contractBreakdownPage;
    private String expectedMexdolarBalance;

    public MexdolarBalanceSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.contractSearchPage = new ContractSearchPage(page);
        this.contractBreakdownPage = new ContractBreakdownPage(page);
    }

    @Given("the user logs in to Acticenter with banquero or advisor credentials")
    public void theUserLogsInToActicenterWithBanqueroOrAdvisorCredentials() {
        loginPage.navigateToLoginPage();
        loginPage.enterUsername(System.getenv("ACTICENTER_USERNAME"));
        loginPage.enterPassword(System.getenv("ACTICENTER_PASSWORD"));
        loginPage.clickLoginButton();
        loginPage.waitForLoginSuccess();
    }

    @When("the user searches and selects a corporate bank contract with associated Mexdolar account")
    public void theUserSearchesAndSelectsCorporateContractWithMexdolar() {
        contractSearchPage.clickSearchButton();
        contractSearchPage.enterContractSearchCriteria("PERSONA_MORAL_WITH_MEXDOLAR");
        contractSearchPage.selectContractFromResults();
    }

    @Then("the contract is displayed in the main view")
    public void theContractIsDisplayedInMainView() {
        assertTrue("Contract should be displayed in main view", 
            contractSearchPage.isContractDisplayedInMainView());
    }

    @When("the user clicks on the contract value component")
    public void theUserClicksOnContractValueComponent() {
        contractBreakdownPage.clickContractValueComponent();
    }

    @Then("the breakdown pop-up is displayed with all applicable items")
    public void theBreakdownPopupIsDisplayedWithAllItems() {
        assertTrue("Breakdown popup should be visible", 
            contractBreakdownPage.isBreakdownPopupVisible());
        assertTrue("Breakdown should contain items", 
            contractBreakdownPage.hasBreakdownItems());
    }

    @And("the Efectivo USD field is visible in the breakdown list")
    public void theEfectivoUsdFieldIsVisibleInBreakdown() {
        assertTrue("Efectivo USD field should be visible", 
            contractBreakdownPage.isEfectivoUsdFieldVisible());
    }

    @And("the Efectivo USD field displays the correct USD amount from SAP without currency conversion")
    public void theEfectivoUsdDisplaysCorrectAmountFromSap() {
        String displayedAmount = contractBreakdownPage.getEfectivoUsdValue();
        assertNotNull("Efectivo USD value should not be null", displayedAmount);
        assertTrue("Efectivo USD should display USD currency format", 
            contractBreakdownPage.isValidUsdFormat(displayedAmount));
    }

    @When("the user selects a corporate bank contract without Mexdolar account")
    public void theUserSelectsCorporateContractWithoutMexdolar() {
        contractBreakdownPage.closeBreakdownPopup();
        contractSearchPage.clickSearchButton();
        contractSearchPage.enterContractSearchCriteria("PERSONA_MORAL_WITHOUT_MEXDOLAR");
        contractSearchPage.selectContractFromResults();
        contractBreakdownPage.clickContractValueComponent();
    }

    @Then("the breakdown pop-up is displayed")
    public void theBreakdownPopupIsDisplayed() {
        assertTrue("Breakdown popup should be visible", 
            contractBreakdownPage.isBreakdownPopupVisible());
    }

    @And("the Efectivo USD field is not displayed in the breakdown")
    public void theEfectivoUsdFieldIsNotDisplayed() {
        assertFalse("Efectivo USD field should not be visible for contracts without Mexdolar", 
            contractBreakdownPage.isEfectivoUsdFieldVisible());
    }

    @When("the user views a contract with Mexdolar account")
    public void theUserViewsContractWithMexdolar() {
        contractBreakdownPage.closeBreakdownPopup();
        contractSearchPage.clickSearchButton();
        contractSearchPage.enterContractSearchCriteria("PERSONA_MORAL_WITH_MEXDOLAR");
        contractSearchPage.selectContractFromResults();
    }

    @Then("the contract is displayed in consultation mode only")
    public void theContractIsDisplayedInConsultationModeOnly() {
        assertTrue("Contract should be in consultation mode", 
            contractBreakdownPage.isContractInConsultationMode());
    }

    @And("buy and sell operations are disabled")
    public void buyAndSellOperationsAreDisabled() {
        assertTrue("Buy button should be disabled", 
            contractBreakdownPage.isBuyButtonDisabled());
        assertTrue("Sell button should be disabled", 
            contractBreakdownPage.isSellButtonDisabled());
    }
}