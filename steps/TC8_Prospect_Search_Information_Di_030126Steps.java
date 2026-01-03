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

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user accesses the Acticenter prospect search functionality")
    public void userAccessesProspectSearch() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search screen should be displayed", prospectSearchPage.isSearchScreenVisible());
    }

    @When("the user enters at least {int} characters in the search field")
    public void userEntersCharactersInSearchField(int minCharacters) {
        prospectSearchPage.enterSearchText("Jo");
    }

    @And("the user executes the search")
    public void userExecutesSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system returns search results")
    public void systemReturnsSearchResults() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
        assertTrue("At least one result should be displayed", prospectSearchPage.getResultsCount() > 0);
    }

    @And("each prospect entry displays the prospect name")
    public void eachProspectDisplaysName() {
        assertTrue("All prospects should display names", prospectSearchPage.allProspectsHaveNames());
    }

    @And("the electronic email key is visible for each prospect")
    public void electronicEmailKeyVisibleForEachProspect() {
        assertTrue("All prospects should display email", prospectSearchPage.allProspectsHaveEmail());
    }

    @And("the displayed information allows proper prospect identification")
    public void displayedInformationAllowsIdentification() {
        assertTrue("Prospect names should be clearly visible", prospectSearchPage.areProspectNamesVisible());
        assertTrue("Email addresses should be clearly visible", prospectSearchPage.areEmailAddressesVisible());
    }
}