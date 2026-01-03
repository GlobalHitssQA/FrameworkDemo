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

    @Given("I am on the Acticenter dashboard")
    public void iAmOnTheActicenterDashboard() {
        prospectSearchPage.navigateToDashboard();
        assertTrue("Dashboard should be visible", prospectSearchPage.isDashboardVisible());
    }

    @When("I enter at least {int} characters in the prospect search field")
    public void iEnterCharactersInProspectSearchField(int minChars) {
        prospectSearchPage.enterSearchText("Jo");
    }

    @When("I enter at least 2 characters in the prospect search field")
    public void iEnterAtLeast2CharactersInProspectSearchField() {
        prospectSearchPage.enterSearchText("Jo");
    }

    @And("I click the search button")
    public void iClickTheSearchButton() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search results should be displayed with matching data from Salesforce")
    public void theSearchResultsShouldBeDisplayed() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
        assertTrue("Results count should be greater than 0", prospectSearchPage.getResultsCount() > 0);
    }

    @And("the matching characters should be highlighted in bold")
    public void theMatchingCharactersShouldBeHighlightedInBold() {
        assertTrue("Highlighted text should be present", prospectSearchPage.hasHighlightedText());
    }

    @When("I review the list showing prospect name and email")
    public void iReviewTheListShowingProspectNameAndEmail() {
        assertTrue("Prospect names should be visible", prospectSearchPage.areProspectNamesVisible());
        assertTrue("Prospect emails should be visible", prospectSearchPage.areProspectEmailsVisible());
    }

    @And("I click on one of the prospects from the results")
    public void iClickOnOneProspectFromResults() {
        prospectSearchPage.selectFirstProspect();
    }

    @Then("the selected prospect should be highlighted or marked as selected")
    public void theSelectedProspectShouldBeHighlighted() {
        assertTrue("Selected prospect should be highlighted", prospectSearchPage.isProspectSelected());
    }

    @When("I confirm the prospect selection")
    public void iConfirmTheProspectSelection() {
        prospectSearchPage.confirmSelection();
    }

    @Then("the system should continue with the selection process flow")
    public void theSystemShouldContinueWithSelectionFlow() {
        assertTrue("Selection process should continue", prospectSearchPage.isSelectionProcessActive());
    }

    @And("the advisor should visualize the prospect information on screen")
    public void theAdvisorShouldVisualizeProspectInformation() {
        assertTrue("Prospect details panel should be visible", prospectSearchPage.isProspectDetailsPanelVisible());
    }

    @And("the displayed information should include prospect name and email")
    public void theDisplayedInformationShouldIncludeNameAndEmail() {
        assertFalse("Prospect name should not be empty", prospectSearchPage.getSelectedProspectName().isEmpty());
        assertFalse("Prospect email should not be empty", prospectSearchPage.getSelectedProspectEmail().isEmpty());
    }
}