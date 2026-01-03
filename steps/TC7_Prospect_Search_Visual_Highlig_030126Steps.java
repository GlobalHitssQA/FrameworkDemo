package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am on the Acticenter prospect search screen")
    public void iAmOnTheActicenterProspectSearchScreen() {
        prospectSearchPage.navigateToSearchScreen();
        assertTrue(prospectSearchPage.isSearchFieldEnabled(), "Search field should be enabled");
    }

    @When("I enter {string} in the search field")
    public void iEnterInTheSearchField(String searchText) {
        prospectSearchPage.enterSearchText(searchText);
    }

    @Then("the system initiates the search and displays results")
    public void theSystemInitiatesTheSearchAndDisplaysResults() {
        prospectSearchPage.waitForSearchResults();
        assertTrue(prospectSearchPage.areResultsDisplayed(), "Search results should be displayed");
    }

    @And("I observe the coincidence list displayed on screen")
    public void iObserveTheCoincidenceListDisplayedOnScreen() {
        assertTrue(prospectSearchPage.isCoincidenceListVisible(), "Coincidence list should be visible");
        assertTrue(prospectSearchPage.getCoincidenceCount() > 0, "At least one coincidence should be displayed");
    }

    @And("the matching characters in prospect names are visually highlighted")
    public void theMatchingCharactersInProspectNamesAreVisuallyHighlighted() {
        assertTrue(prospectSearchPage.areMatchingCharactersHighlighted(), "Matching characters should be highlighted in prospect names");
    }
}