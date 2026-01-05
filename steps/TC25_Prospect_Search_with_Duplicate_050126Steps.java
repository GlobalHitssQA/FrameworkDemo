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
    private String duplicateProspectName = "Juan Perez";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is on the Acticenter prospect search page")
    public void userIsOnProspectSearchPage() {
        prospectSearchPage.navigateToSearchPage();
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @When("the user enters a prospect name that exists multiple times in the database")
    public void userEntersDuplicateProspectName() {
        prospectSearchPage.enterProspectName(duplicateProspectName);
    }

    @And("the user initiates the search")
    public void userInitiatesSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system displays all matching prospects")
    public void systemDisplaysMatchingProspects() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
        int resultCount = prospectSearchPage.getSearchResultsCount();
        assertTrue("At least one result should be displayed", resultCount > 0);
    }

    @And("each result shows the prospect name in bold")
    public void eachResultShowsNameInBold() {
        assertTrue("Names should be highlighted in bold", prospectSearchPage.areNamesHighlightedInBold());
    }

    @And("each result displays the email address to differentiate duplicates")
    public void eachResultDisplaysEmailAddress() {
        assertTrue("Email addresses should be visible for each result", prospectSearchPage.areEmailAddressesVisible());
    }

    @And("the system shows the first 5 matches initially")
    public void systemShowsFirst5Matches() {
        int visibleResults = prospectSearchPage.getVisibleResultsCount();
        assertTrue("Should display up to 5 results initially", visibleResults <= 5);
    }

    @And("additional matches are accessible via scroll if more than 5 exist")
    public void additionalMatchesAccessibleViaScroll() {
        if (prospectSearchPage.getSearchResultsCount() > 5) {
            assertTrue("Scroll should be available for additional results", prospectSearchPage.isScrollAvailable());
        }
    }

    @When("the user selects one of the duplicate name prospects")
    public void userSelectsOneProspect() {
        prospectSearchPage.selectProspectByIndex(0);
    }

    @Then("the system loads the selected prospect using the unique identifier")
    public void systemLoadsSelectedProspect() {
        assertTrue("Prospect details should be loaded", prospectSearchPage.isProspectDetailsPageVisible());
        assertNotNull("Prospect unique ID should be present in URL or page", prospectSearchPage.getLoadedProspectId());
    }
}