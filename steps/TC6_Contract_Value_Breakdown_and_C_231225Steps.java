package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.ContractValuePage;
import static org.junit.Assert.*;

public class ContractValueSteps {
    private WebDriver driver;
    private ContractValuePage contractValuePage;
    
    public ContractValueSteps(WebDriver driver) {
        this.driver = driver;
        this.contractValuePage = new ContractValuePage(driver);
    }
    
    @Given("the user is authenticated in Acticenter")
    public void userIsAuthenticated() {
        contractValuePage.verifyUserAuthenticated();
    }
    
    @Given("contracts with zero value items are available for testing")
    public void contractsWithZeroValueAvailable() {
        contractValuePage.verifyZeroValueContractsAvailable();
    }
    
    @Given("contracts of different types are available \\(Physical Person, Moral Person, Bank, Brokerage House\\)")
    public void differentContractTypesAvailable() {
        contractValuePage.verifyDifferentContractTypesAvailable();
    }
    
    @Given("the user selects a contract with some items without monetary value")
    public void selectContractWithZeroValueItems() {
        contractValuePage.selectContractWithZeroValues();
    }
    
    @When("the contract total value component is displayed")
    public void contractTotalValueDisplayed() {
        assertTrue(contractValuePage.isContractValueComponentDisplayed());
    }
    
    @When("the user opens the contract value breakdown")
    public void openContractValueBreakdown() {
        contractValuePage.openValueBreakdown();
    }
    
    @Then("the popup with complete breakdown is displayed")
    public void popupWithBreakdownDisplayed() {
        assertTrue(contractValuePage.isBreakdownPopupDisplayed());
    }
    
    @Then("all applicable items without balance show $0.00 correctly")
    public void verifyZeroValueItemsDisplay() {
        assertTrue(contractValuePage.verifyZeroValueItemsShowCorrectly());
    }
    
    @Then("the currency format shows $0.00 with two decimal places")
    public void verifyCurrencyFormat() {
        assertTrue(contractValuePage.verifyCurrencyFormatWithTwoDecimals());
    }
    
    @When("the user closes the popup")
    public void closePopup() {
        contractValuePage.closeBreakdownPopup();
    }
    
    @When("clicks on the search magnifying glass in desktop version")
    public void clickSearchMagnifyingGlassDesktop() {
        contractValuePage.clickSearchMagnifyingGlass();
    }
    
    @Then("the general client or BP screen is presented as currently shown in Acticenter")
    public void verifyGeneralClientScreen() {
        assertTrue(contractValuePage.isGeneralClientScreenDisplayed());
    }
    
    @When("the user selects a contract from the search")
    public void selectContractFromSearch() {
        contractValuePage.selectContractFromSearchResults();
    }
    
    @Then("the contract is selected and displayed correctly")
    public void verifyContractSelectedAndDisplayed() {
        assertTrue(contractValuePage.isContractDisplayedCorrectly());
    }
    
    @When("the user switches to responsive view")
    public void switchToResponsiveView() {
        contractValuePage.switchToResponsiveView();
    }
    
    @When("presses the search magnifying glass")
    public void pressSearchMagnifyingGlass() {
        contractValuePage.clickSearchMagnifyingGlass();
    }
    
    @Then("the general client screen is presented as currently shown in Acticenter module")
    public void verifyGeneralClientScreenResponsive() {
        assertTrue(contractValuePage.isGeneralClientScreenDisplayed());
    }
    
    @When("the user selects another contract from the search in responsive view")
    public void selectAnotherContractResponsive() {
        contractValuePage.selectContractFromSearchResults();
    }
    
    @Then("the advisor can select the contract to view or operate")
    public void verifyAdvisorCanSelectContract() {
        assertTrue(contractValuePage.isContractDisplayedCorrectly());
    }
    
    @When("the user searches for Physical Person and Moral Person contracts")
    public void searchPhysicalAndMoralPersonContracts() {
        contractValuePage.searchByContractType("Physical Person");
        contractValuePage.searchByContractType("Moral Person");
    }
    
    @Then("the search returns results for both legal personality types")
    public void verifyLegalPersonalitySearchResults() {
        assertTrue(contractValuePage.hasSearchResults());
    }
    
    @When("the user searches for Bank and Brokerage House contracts")
    public void searchBankAndBrokerageContracts() {
        contractValuePage.searchByContractType("Bank");
        contractValuePage.searchByContractType("Brokerage House");
    }
    
    @Then("the search returns results for both institution types")
    public void verifyInstitutionSearchResults() {
        assertTrue(contractValuePage.hasSearchResults());
    }
    
    @When("the user verifies search within header in desktop version")
    public void verifyHeaderSearchDesktop() {
        contractValuePage.verifyHeaderSearchFunctionality();
    }
    
    @Then("the client-contract search in header works as presented throughout the Acticenter module")
    public void verifyHeaderSearchWorks() {
        assertTrue(contractValuePage.isHeaderSearchWorking());
    }
}