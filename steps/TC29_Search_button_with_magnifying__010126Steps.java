package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class SearchButtonSteps {

    private Page page;
    private GitHubProfileSearchPage searchPage;

    public SearchButtonSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user accesses the GitHub profile search application")
    public void theUserAccessesTheGitHubProfileSearchApplication() {
        searchPage.navigateToApplication();
    }

    @And("the search component is visible on the page")
    public void theSearchComponentIsVisibleOnThePage() {
        assertTrue("Search component should be visible", searchPage.isSearchComponentVisible());
    }

    @When("the user locates the search button next to the text input field")
    public void theUserLocatesTheSearchButtonNextToTheTextInputField() {
        assertTrue("Search button should exist", searchPage.isSearchButtonPresent());
    }

    @Then("the search button should be visible and positioned appropriately")
    public void theSearchButtonShouldBeVisibleAndPositionedAppropriately() {
        assertTrue("Search button should be visible", searchPage.isSearchButtonVisible());
    }

    @And("the search button should display a magnifying glass icon")
    public void theSearchButtonShouldDisplayAMagnifyingGlassIcon() {
        assertTrue("Magnifying glass icon should be visible on search button", searchPage.isMagnifyingGlassIconVisible());
    }

    @When("the user enters a valid GitHub username in the search input field")
    public void theUserEntersAValidGitHubUsernameInTheSearchInputField() {
        searchPage.enterUsername("octocat");
    }

    @And("the user clicks the search button with the magnifying glass icon")
    public void theUserClicksTheSearchButtonWithTheMagnifyingGlassIcon() {
        searchPage.clickSearchButton();
    }

    @Then("the search should be triggered and profile query initiated")
    public void theSearchShouldBeTriggeredAndProfileQueryInitiated() {
        searchPage.waitForProfileLoad();
    }

    @And("the user profile information should be displayed correctly")
    public void theUserProfileInformationShouldBeDisplayedCorrectly() {
        assertTrue("User profile should be displayed", searchPage.isProfileDisplayed());
        assertTrue("User avatar should be visible", searchPage.isAvatarVisible());
        assertTrue("Username should be displayed", searchPage.isUsernameDisplayed());
    }
}