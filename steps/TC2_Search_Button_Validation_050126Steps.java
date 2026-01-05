package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import pages.SearchPage;
import static org.junit.Assert.*;

public class SearchButtonSteps {
    private Page page;
    private SearchPage searchPage;

    public SearchButtonSteps(Page page) {
        this.page = page;
        this.searchPage = new SearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void navigateToSearchComponent() {
        searchPage.navigateToSearchPage();
    }

    @When("the user locates the search button next to the text input field")
    public void locateSearchButton() {
        assertTrue("Search button should be visible", searchPage.isSearchButtonVisible());
    }

    @Then("the search button should display a magnifying glass icon")
    public void verifyMagnifyingGlassIcon() {
        assertTrue("Search button should contain magnifying glass icon", searchPage.hasSearchIcon());
    }

    @Then("the search button should be enabled and clickable")
    public void verifyButtonIsEnabledAndClickable() {
        assertTrue("Search button should be enabled", searchPage.isSearchButtonEnabled());
        assertTrue("Search button should be clickable", searchPage.isSearchButtonClickable());
    }
}