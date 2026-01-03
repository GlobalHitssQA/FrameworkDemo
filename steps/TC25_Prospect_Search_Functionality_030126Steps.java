package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String searchTerm = "Jo";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user has accessed Acticenter")
    public void theUserHasAccessedActicenter() {
        page.navigate("https://actinver.atlassian.net");
        assertTrue(prospectSearchPage.isDashboardVisible());
    }

    @When("the user enters at least 2 characters in the prospect search field")
    public void theUserEntersAtLeastTwoCharactersInTheProspectSearchField() {
        prospectSearchPage.enterSearchTerm(searchTerm);
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search executes against Salesforce database")
    public void theSearchExecutesAgainstSalesforceDatabase() {
        prospectSearchPage.waitForSearchResults();
        assertTrue(prospectSearchPage.areResultsDisplayed());
    }

    @And("the results display showing prospect names and electronic emails")
    public void theResultsDisplayShowingProspectNamesAndElectronicEmails() {
        assertTrue(prospectSearchPage.getResultsCount() > 0);
        assertTrue(prospectSearchPage.areNamesVisible());
        assertTrue(prospectSearchPage.areEmailsVisible());
    }

    @And("matching characters in prospect names are displayed in bold")
    public void matchingCharactersInProspectNamesAreDisplayedInBold() {
        assertTrue(prospectSearchPage.areMatchingCharactersBold(searchTerm));
    }

    @And("the first 5 matching results are visible without scrolling")
    public void theFirstFiveMatchingResultsAreVisibleWithoutScrolling() {
        int visibleResults = prospectSearchPage.getVisibleResultsCount();
        assertTrue(visibleResults >= 5 || visibleResults == prospectSearchPage.getResultsCount());
    }

    @And("scroll appears if more than 6 results exist to view additional coincidences")
    public void scrollAppearsIfMoreThanSixResultsExistToViewAdditionalCoincidences() {
        if (prospectSearchPage.getResultsCount() > 6) {
            assertTrue(prospectSearchPage.isScrollVisible());
            prospectSearchPage.scrollToLastResult();
        }
    }

    @And("each result displays complete prospect name and electronic email address")
    public void eachResultDisplaysCompleteProspectNameAndElectronicEmailAddress() {
        assertTrue(prospectSearchPage.allResultsHaveNameAndEmail());
    }
}