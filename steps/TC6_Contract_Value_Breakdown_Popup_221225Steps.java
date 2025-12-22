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
    private ContractValueBreakdownPage breakdownPage;
    
    public ContractValueBreakdownSteps(WebDriver driver) {
        this.driver = driver;
        this.breakdownPage = new ContractValueBreakdownPage(driver);
    }
    
    @Given("the user is authenticated in Acticenter")
    public void theUserIsAuthenticatedInActicenter() {
        breakdownPage.navigateToActicenter();
        breakdownPage.performLogin();
    }
    
    @And("the user has a contract selected")
    public void theUserHasAContractSelected() {
        breakdownPage.selectContract();
    }
    
    @And("the contract value component is visible and functional")
    public void theContractValueComponentIsVisibleAndFunctional() {
        assertTrue(breakdownPage.isContractValueComponentVisible());
    }
    
    @Given("the user accesses a contract in Acticenter")
    public void theUserAccessesAContractInActicenter() {
        breakdownPage.accessContract();
    }
    
    @When("the user clicks on the contract value component to display the breakdown")
    public void theUserClicksOnTheContractValueComponentToDisplayTheBreakdown() {
        breakdownPage.clickContractValueComponent();
    }
    
    @Then("the system displays the pop-up with the contract composition breakdown")
    public void theSystemDisplaysThePopupWithTheContractCompositionBreakdown() {
        assertTrue(breakdownPage.isBreakdownPopupDisplayed());
    }
    
    @When("the user verifies that the breakdown pop-up is open and visible on screen")
    public void theUserVerifiesThatTheBreakdownPopupIsOpenAndVisibleOnScreen() {
        assertTrue(breakdownPage.isBreakdownPopupVisible());
    }
    
    @Then("the breakdown is fully displayed showing all applicable items")
    public void theBreakdownIsFullyDisplayedShowingAllApplicableItems() {
        assertTrue(breakdownPage.areAllBreakdownItemsVisible());
    }
    
    @When("the user clicks on any area of the screen outside the breakdown component")
    public void theUserClicksOnAnyAreaOfTheScreenOutsideTheBreakdownComponent() {
        breakdownPage.clickOutsideBreakdownPopup();
    }
    
    @Then("the breakdown pop-up closes automatically")
    public void theBreakdownPopupClosesAutomatically() {
        assertFalse(breakdownPage.isBreakdownPopupVisible());
    }
    
    @When("the user verifies that the main contract value component remains visible")
    public void theUserVerifiesThatTheMainContractValueComponentRemainsVisible() {
        assertTrue(breakdownPage.isContractValueComponentVisible());
    }
    
    @Then("the main component with the total contract value is still visible after closing the breakdown")
    public void theMainComponentWithTheTotalContractValueIsStillVisibleAfterClosingTheBreakdown() {
        assertTrue(breakdownPage.isContractValueComponentVisible());
        assertTrue(breakdownPage.isTotalContractValueDisplayed());
    }
    
    @When("the user opens the breakdown again")
    public void theUserOpensTheBreakdownAgain() {
        breakdownPage.clickContractValueComponent();
        assertTrue(breakdownPage.isBreakdownPopupVisible());
    }
    
    @And("the user clicks on different areas outside the component to validate consistency")
    public void theUserClicksOnDifferentAreasOutsideTheComponentToValidateConsistency() {
        breakdownPage.clickMultipleAreasOutsidePopup();
    }
    
    @Then("in all cases the pop-up closes when clicking outside it")
    public void inAllCasesThePopupClosesWhenClickingOutsideIt() {
        assertFalse(breakdownPage.isBreakdownPopupVisible());
    }
    
    @And("the user clicks inside the breakdown pop-up area")
    public void theUserClicksInsideTheBreakdownPopupArea() {
        breakdownPage.clickInsideBreakdownPopup();
    }
    
    @Then("the breakdown remains open when clicking inside its area")
    public void theBreakdownRemainsOpenWhenClickingInsideItsArea() {
        assertTrue(breakdownPage.isBreakdownPopupVisible());
    }
}