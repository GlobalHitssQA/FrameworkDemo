package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.LoginPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged into Acticenter as an advisor")
    public void iAmLoggedIntoActicenterAsAnAdvisor() {
        page.navigate("https://acticenter.actinver.com");
        loginPage.login("advisor@actinver.com", "password123");
        assertTrue("Login should be successful", loginPage.isLoginSuccessful());
    }

    @When("I navigate to the prospect search field")
    public void iNavigateToTheProspectSearchField() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search field should be displayed", prospectSearchPage.isSearchFieldVisible());
    }

    @And("I type {string} in the search field")
    public void iTypeInTheSearchField(String searchText) {
        prospectSearchPage.typeInSearchField(searchText);
    }

    @Then("the search results should be displayed")
    public void theSearchResultsShouldBeDisplayed() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
    }

    @And("the characters {string} should appear in bold in the prospect name {string}")
    public void theCharactersShouldAppearInBoldInTheProspectName(String searchChars, String prospectName) {
        assertTrue("Characters should be highlighted in bold", 
            prospectSearchPage.areCharactersHighlightedInBold(searchChars, prospectName));
    }

    @When("I change the search criteria to match characters in the middle of a name")
    public void iChangeTheSearchCriteriaToMatchCharactersInTheMiddleOfAName() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.typeInSearchField("oh");
    }

    @Then("new search results should be displayed")
    public void newSearchResultsShouldBeDisplayed() {
        assertTrue("New search results should be visible", prospectSearchPage.areSearchResultsVisible());
    }

    @And("the matching characters should appear in bold regardless of their position in the name")
    public void theMatchingCharactersShouldAppearInBoldRegardlessOfTheirPositionInTheName() {
        assertTrue("Characters should be highlighted regardless of position", 
            prospectSearchPage.areCharactersHighlightedInResults());
    }
}