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

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        prospectSearchPage.navigateToActicenter();
        prospectSearchPage.performLogin();
    }

    @When("the advisor navigates to the prospect search field")
    public void theAdvisorNavigatesToTheProspectSearchField() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @And("the advisor types at least {int} characters in the search field")
    public void theAdvisorTypesAtLeastCharactersInTheSearchField(int minCharacters) {
        prospectSearchPage.typeInSearchField("Te");
    }

    @Then("the search results are displayed")
    public void theSearchResultsAreDisplayed() {
        assertTrue("Search results should be displayed", prospectSearchPage.areSearchResultsDisplayed());
    }

    @And("each search result displays the prospect name")
    public void eachSearchResultDisplaysTheProspectName() {
        assertTrue("All search results should display prospect names", 
            prospectSearchPage.allResultsHaveProspectNames());
    }

    @And("each search result displays the electronic email key")
    public void eachSearchResultDisplaysTheElectronicEmailKey() {
        assertTrue("All search results should display electronic email keys", 
            prospectSearchPage.allResultsHaveEmailKeys());
    }

    @And("both prospect name and electronic email key are clearly visible and readable")
    public void bothProspectNameAndElectronicEmailKeyAreClearlyVisibleAndReadable() {
        assertTrue("Prospect names should be visible and readable", 
            prospectSearchPage.areProspectNamesReadable());
        assertTrue("Email keys should be visible and readable", 
            prospectSearchPage.areEmailKeysReadable());
    }
}