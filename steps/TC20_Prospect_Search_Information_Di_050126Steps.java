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
    private int resultCount;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is on the prospect search screen")
    public void theAdvisorIsOnTheProspectSearchScreen() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
        assertTrue(prospectSearchPage.isSearchFieldVisible());
    }

    @When("the advisor enters valid search criteria")
    public void theAdvisorEntersValidSearchCriteria() {
        prospectSearchPage.enterSearchCriteria("test@example.com");
    }

    @And("the advisor executes the search")
    public void theAdvisorExecutesTheSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForResults();
    }

    @Then("the system displays matching prospects")
    public void theSystemDisplaysMatchingProspects() {
        resultCount = prospectSearchPage.getResultCount();
        assertTrue("No results displayed", resultCount > 0);
    }

    @And("each prospect shows name and email address")
    public void eachProspectShowsNameAndEmailAddress() {
        for (int i = 0; i < Math.min(resultCount, 5); i++) {
            assertNotNull("Prospect name is missing", prospectSearchPage.getProspectName(i));
            assertNotNull("Prospect email is missing", prospectSearchPage.getProspectEmail(i));
            assertFalse("Prospect name is empty", prospectSearchPage.getProspectName(i).isEmpty());
            assertFalse("Prospect email is empty", prospectSearchPage.getProspectEmail(i).isEmpty());
        }
    }

    @And("matching characters are highlighted")
    public void matchingCharactersAreHighlighted() {
        assertTrue("No highlighted text found", prospectSearchPage.hasHighlightedText());
    }

    @And("the information is sufficient for identification")
    public void theInformationIsSufficientForIdentification() {
        assertTrue("Name not visible", prospectSearchPage.isProspectNameVisible(0));
        assertTrue("Email not visible", prospectSearchPage.isProspectEmailVisible(0));
    }

    @And("scroll functionality is available for more than 5 results")
    public void scrollFunctionalityIsAvailableForMoreThanFiveResults() {
        if (resultCount > 5) {
            assertTrue("Scroll not available", prospectSearchPage.isScrollable());
        }
    }
}