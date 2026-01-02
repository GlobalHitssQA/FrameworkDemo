package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String searchTerm = "ab";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        page.navigate("https://actinver.atlassian.net");
        prospectSearchPage.waitForDashboardToLoad();
    }

    @When("the advisor navigates to the prospect search field")
    public void theAdvisorNavigatesToTheProspectSearchField() {
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
        prospectSearchPage.focusSearchField();
    }

    @And("the advisor types at least 2 characters from a known prospect email key")
    public void theAdvisorTypesAtLeastTwoCharactersFromAKnownProspectEmailKey() {
        prospectSearchPage.typeInSearchField(searchTerm);
    }

    @Then("the search results should display prospects matching the entered email key")
    public void theSearchResultsShouldDisplayProspectsMatchingTheEnteredEmailKey() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
        int resultsCount = prospectSearchPage.getSearchResultsCount();
        assertTrue("At least one result should be displayed", resultsCount > 0);
    }

    @And("the matching characters should be highlighted in the email key")
    public void theMatchingCharactersShouldBeHighlightedInTheEmailKey() {
        assertTrue("Highlighted text should be present in results", 
            prospectSearchPage.areMatchingCharactersHighlighted());
    }

    @And("each result should show the prospect name and electronic email key")
    public void eachResultShouldShowTheProspectNameAndElectronicEmailKey() {
        assertTrue("Prospect names should be displayed", 
            prospectSearchPage.areProspectNamesDisplayed());
        assertTrue("Email keys should be displayed", 
            prospectSearchPage.areEmailKeysDisplayed());
    }
}