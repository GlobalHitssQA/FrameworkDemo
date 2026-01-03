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
    private String selectedProspectName;
    private String selectedProspectEmail;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is on the prospect search page")
    public void theUserIsOnProspectSearchPage() {
        prospectSearchPage.navigateToSearchPage();
        assertTrue(prospectSearchPage.isSearchFieldVisible());
    }

    @When("the user performs a valid prospect search with at least 3 characters")
    public void theUserPerformsValidProspectSearch() {
        prospectSearchPage.enterSearchTerm("John");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system displays a list of matching prospects with highlighted information")
    public void theSystemDisplaysMatchingProspects() {
        assertTrue(prospectSearchPage.isResultsListVisible());
        assertTrue(prospectSearchPage.getResultsCount() > 0);
    }

    @And("the list shows up to 5 prospects with name and email visible")
    public void theListShowsUpToFiveProspects() {
        int resultsCount = prospectSearchPage.getResultsCount();
        assertTrue(resultsCount <= 5);
        assertTrue(prospectSearchPage.isFirstProspectNameVisible());
        assertTrue(prospectSearchPage.isFirstProspectEmailVisible());
    }

    @When("the user selects one prospect from the coincidence list")
    public void theUserSelectsOneProspect() {
        selectedProspectName = prospectSearchPage.getFirstProspectName();
        selectedProspectEmail = prospectSearchPage.getFirstProspectEmail();
        prospectSearchPage.selectFirstProspect();
    }

    @Then("the selected prospect is highlighted or marked as selected")
    public void theSelectedProspectIsHighlighted() {
        assertTrue(prospectSearchPage.isFirstProspectSelected());
    }

    @When("the user confirms the selection to proceed")
    public void theUserConfirmsSelection() {
        prospectSearchPage.clickConfirmButton();
    }

    @Then("the system navigates to the next screen with selected prospect data")
    public void theSystemNavigatesToNextScreen() {
        prospectSearchPage.waitForNavigationToNextScreen();
        assertTrue(prospectSearchPage.isOnNextScreen());
    }

    @And("the prospect name and email are correctly displayed in the following steps")
    public void theProspectDataIsDisplayedCorrectly() {
        String displayedName = prospectSearchPage.getDisplayedProspectName();
        String displayedEmail = prospectSearchPage.getDisplayedProspectEmail();
        assertEquals(selectedProspectName, displayedName);
        assertEquals(selectedProspectEmail, displayedEmail);
    }
}