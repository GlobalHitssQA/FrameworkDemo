package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.ContractValuePage;
import static org.junit.Assert.*;

public class ContractValueBreakdownSteps {
    private WebDriver driver;
    private ContractValuePage contractValuePage;

    public ContractValueBreakdownSteps(WebDriver driver) {
        this.driver = driver;
        this.contractValuePage = new ContractValuePage(driver);
    }

    @Given("the user is authenticated in Acticenter")
    public void theUserIsAuthenticatedInActicenter() {
        contractValuePage.navigateToActicenter();
        contractValuePage.authenticateUser();
    }

    @And("a contract has been previously selected")
    public void aContractHasBeenPreviouslySelected() {
        contractValuePage.selectContract();
    }

    @And("the contract valuation services are available")
    public void theContractValuationServicesAreAvailable() {
        assertTrue("Contract valuation services should be available", 
                   contractValuePage.areValuationServicesAvailable());
    }

    @Given("the main component displays the total contract value")
    public void theMainComponentDisplaysTheTotalContractValue() {
        assertTrue("Contract value component should be visible", 
                   contractValuePage.isContractValueComponentVisible());
    }

    @When("the user clicks on any part of the contract value component")
    public void theUserClicksOnAnyPartOfTheContractValueComponent() {
        contractValuePage.clickContractValueComponent();
    }

    @Then("the system displays a pop-up with the detailed breakdown of the contract value composition")
    public void theSystemDisplaysAPopUpWithTheDetailedBreakdown() {
        assertTrue("Breakdown pop-up should be displayed", 
                   contractValuePage.isBreakdownPopupDisplayed());
    }

    @And("the pop-up shows all applicable items according to the selected contract type")
    public void thePopUpShowsAllApplicableItems() {
        assertTrue("All applicable items should be present", 
                   contractValuePage.verifyAllApplicableItemsPresent());
    }

    @And("each item displays its monetary value on the right side with correct format")
    public void eachItemDisplaysItsMonetaryValueWithCorrectFormat() {
        assertTrue("All items should have correct monetary format", 
                   contractValuePage.verifyMonetaryFormatForAllItems());
    }

    @And("the breakdown list is vertically aligned with the total contract value component")
    public void theBreakdownListIsVerticallyAligned() {
        assertTrue("Pop-up should be vertically aligned with main component", 
                   contractValuePage.isPopupVerticallyAligned());
    }

    @And("items without monetary value display $0.00")
    public void itemsWithoutMonetaryValueDisplayZero() {
        assertTrue("Empty items should display $0.00", 
                   contractValuePage.verifyEmptyItemsShowZero());
    }
}