package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import org.openqa.selenium.WebDriver;
import pages.ContractValueBreakdownPage;
import static org.junit.Assert.*;

public class ContractValueBreakdownSteps {
    private WebDriver driver;
    private ContractValueBreakdownPage contractPage;
    
    public ContractValueBreakdownSteps(WebDriver driver) {
        this.driver = driver;
        this.contractPage = new ContractValueBreakdownPage(driver);
    }
    
    @Given("the user is authenticated in Acticenter")
    public void userIsAuthenticated() {
        contractPage.navigateToActicenter();
        assertTrue("User should be authenticated", contractPage.isUserAuthenticated());
    }
    
    @Given("contracts with items valued at $0.00 are available for testing")
    public void contractsWithZeroValueAvailable() {
        assertTrue("Contracts with zero value items should be available", contractPage.areZeroValueContractsAvailable());
    }
    
    @Given("contracts of different types are available: Individual, Corporate, Bank, Brokerage House")
    public void contractsOfDifferentTypesAvailable() {
        assertTrue("Different contract types should be available", contractPage.areAllContractTypesAvailable());
    }
    
    @Given("I select a contract that has no monetary value in some applicable items")
    public void selectContractWithZeroValueItems() {
        contractPage.selectContractWithZeroValueItems();
    }
    
    @When("I view the total contract value component")
    public void viewTotalContractValueComponent() {
        contractPage.viewContractValueComponent();
    }
    
    @Then("the contract value component should be visible")
    public void contractValueComponentVisible() {
        assertTrue("Contract value component should be visible", contractPage.isContractValueComponentVisible());
    }
    
    @When("I open the contract value breakdown")
    public void openContractValueBreakdown() {
        contractPage.openValueBreakdown();
    }
    
    @Then("the popup with complete breakdown should be displayed")
    public void popupWithBreakdownDisplayed() {
        assertTrue("Breakdown popup should be displayed", contractPage.isBreakdownPopupDisplayed());
    }
    
    @When("I verify items without monetary value")
    public void verifyItemsWithoutMonetaryValue() {
        contractPage.checkZeroValueItems();
    }
    
    @Then("all applicable contract items without balance should display $0.00 correctly")
    public void itemsDisplayZeroCorrectly() {
        assertTrue("All zero value items should display $0.00", contractPage.allZeroValueItemsDisplayCorrectly());
    }
    
    @Then("the format should show $0.00 with two decimal places")
    public void formatShowsTwoDecimals() {
        assertTrue("Format should show two decimal places", contractPage.zeroValueFormatHasTwoDecimals());
    }
    
    @When("I close the popup and click the search magnifying glass in desktop version")
    public void closePopupAndClickSearchDesktop() {
        contractPage.closeBreakdownPopup();
        contractPage.clickSearchMagnifyingGlassDesktop();
    }
    
    @Then("the general client or BP screen should be presented as currently shown in Acticenter")
    public void generalClientScreenPresented() {
        assertTrue("General client screen should be displayed", contractPage.isGeneralClientScreenDisplayed());
    }
    
    @When("I select a contract from the search results")
    public void selectContractFromSearchResults() {
        contractPage.selectContractFromSearch();
    }
    
    @Then("the contract should be selected and displayed correctly")
    public void contractSelectedAndDisplayed() {
        assertTrue("Contract should be selected and displayed", contractPage.isContractSelectedAndDisplayed());
    }
    
    @When("I switch to responsive view and press the search magnifying glass")
    public void switchToResponsiveAndClickSearch() {
        contractPage.switchToResponsiveView();
        contractPage.clickSearchMagnifyingGlassResponsive();
    }
    
    @Then("the general client screen should be presented as currently shown in Acticenter module")
    public void generalClientScreenPresentedResponsive() {
        assertTrue("General client screen should be displayed in responsive", contractPage.isGeneralClientScreenDisplayedResponsive());
    }
    
    @When("I select another contract from the search in responsive view")
    public void selectAnotherContractResponsive() {
        contractPage.selectAnotherContractFromSearchResponsive();
    }
    
    @Then("the advisor should be able to select the contract to view or operate")
    public void advisorCanSelectContract() {
        assertTrue("Advisor should be able to select contract", contractPage.canSelectContractInResponsive());
    }
    
    @When("I verify the search works for Individual and Corporate contracts")
    public void verifySearchForIndividualAndCorporate() {
        contractPage.searchForIndividualContracts();
        contractPage.searchForCorporateContracts();
    }
    
    @Then("the search should return results for both legal personality types")
    public void searchReturnsResultsForBothPersonalityTypes() {
        assertTrue("Search should return Individual contracts", contractPage.hasIndividualContractResults());
        assertTrue("Search should return Corporate contracts", contractPage.hasCorporateContractResults());
    }
    
    @When("I verify the search works for Bank and Brokerage House contracts")
    public void verifySearchForBankAndBrokerageHouse() {
        contractPage.searchForBankContracts();
        contractPage.searchForBrokerageHouseContracts();
    }
    
    @Then("the search should return results for both institution types")
    public void searchReturnsResultsForBothInstitutionTypes() {
        assertTrue("Search should return Bank contracts", contractPage.hasBankContractResults());
        assertTrue("Search should return Brokerage House contracts", contractPage.hasBrokerageHouseContractResults());
    }
    
    @When("I verify the search within the header in desktop version")
    public void verifySearchInHeader() {
        contractPage.performSearchInHeaderDesktop();
    }
    
    @Then("the client-contract search in the header should work as presented throughout the Acticenter module")
    public void headerSearchWorksCorrectly() {
        assertTrue("Header search should work correctly", contractPage.isHeaderSearchFunctional());
    }
}