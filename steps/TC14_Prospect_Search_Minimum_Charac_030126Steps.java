package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import com.microsoft.playwright.Page;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    
    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }
    
    @Given("I am on the prospect search screen in Acticenter")
    public void iAmOnTheProspectSearchScreen() {
        prospectSearchPage.navigateToSearchScreen();
        assertTrue("Search screen should be visible", prospectSearchPage.isSearchScreenVisible());
        assertTrue("Search input field should be available", prospectSearchPage.isSearchInputVisible());
    }
    
    @When("I enter exactly {int} characters in the search field")
    public void iEnterExactlyCharactersInTheSearchField(int characterCount) {
        String searchText = "AB";
        prospectSearchPage.enterSearchText(searchText);
    }
    
    @Then("the system should accept the input without triggering the search")
    public void theSystemShouldAcceptTheInputWithoutTriggeringTheSearch() {
        assertFalse("Search results should not be visible yet", prospectSearchPage.areSearchResultsVisible());
        String inputValue = prospectSearchPage.getSearchInputValue();
        assertEquals("Input should contain exactly 2 characters", 2, inputValue.length());
    }
    
    @When("I enter a third character to reach {int} characters minimum")
    public void iEnterAThirdCharacterToReachCharactersMinimum(int minimumCharacters) {
        prospectSearchPage.appendSearchText("C");
    }
    
    @Then("the system should automatically trigger the search")
    public void theSystemShouldAutomaticallyTriggerTheSearch() {
        prospectSearchPage.waitForSearchToExecute();
        assertTrue("Search should have been triggered", prospectSearchPage.hasSearchExecuted());
    }
    
    @And("the search results should be displayed or a no results message should appear")
    public void theSearchResultsShouldBeDisplayedOrANoResultsMessageShouldAppear() {
        assertTrue("Either results or no results message should be visible", 
            prospectSearchPage.areSearchResultsVisible() || prospectSearchPage.isNoResultsMessageVisible());
    }
}