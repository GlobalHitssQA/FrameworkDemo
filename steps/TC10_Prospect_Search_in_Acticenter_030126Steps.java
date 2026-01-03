package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.LoginPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private String searchedProspectName = "John Doe";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged in to Acticenter as an advisor user")
    public void iAmLoggedInToActicenterAsAdvisorUser() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor@test.com", "password123");
        assertTrue("User should be authenticated", loginPage.isAuthenticated());
    }

    @When("I navigate to the prospect search functionality")
    public void iNavigateToProspectSearchFunctionality() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @And("I enter a valid prospect name with more than 2 characters")
    public void iEnterValidProspectNameWithMoreThan2Characters() {
        prospectSearchPage.enterProspectName(searchedProspectName);
        String enteredText = prospectSearchPage.getSearchFieldValue();
        assertTrue("Search field should contain entered text", enteredText.length() > 2);
    }

    @And("I execute the search by clicking the search icon")
    public void iExecuteSearchByClickingSearchIcon() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the system should display prospects matching the entered name")
    public void systemShouldDisplayProspectsMatchingEnteredName() {
        assertTrue("Results list should be visible", prospectSearchPage.areResultsVisible());
        int resultsCount = prospectSearchPage.getResultsCount();
        assertTrue("At least one result should be displayed", resultsCount > 0);
        assertTrue("Results should contain prospect name and email", prospectSearchPage.resultsContainNameAndEmail());
    }

    @And("the matching characters should be highlighted in bold in the results")
    public void matchingCharactersShouldBeHighlightedInBold() {
        assertTrue("Matching characters should be highlighted", prospectSearchPage.areMatchesHighlighted());
    }
}