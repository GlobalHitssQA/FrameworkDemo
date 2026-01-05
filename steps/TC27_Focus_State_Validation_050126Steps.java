package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;

public class FocusStateSteps {
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    public FocusStateSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search interface")
    public void navigateToGitHubProfileSearch() {
        profileSearchPage.navigateToSearchInterface();
    }

    @When("the user clicks on the search input field")
    public void clickSearchInputField() {
        profileSearchPage.clickSearchInput();
    }

    @Then("the input field should display a visible focus state")
    public void verifyInputFieldFocusState() {
        profileSearchPage.verifySearchInputHasFocus();
    }

    @When("the user clicks on the search button")
    public void clickSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the search button should show a focus state with visual indicator")
    public void verifySearchButtonFocusState() {
        profileSearchPage.verifySearchButtonHasFocus();
    }

    @When("the user searches for a valid GitHub user")
    public void searchForValidUser() {
        profileSearchPage.searchUser("octocat");
    }

    @And("the user clicks on the Follow button")
    public void clickFollowButton() {
        profileSearchPage.clickFollowButton();
    }

    @Then("the Follow button should display a focus state")
    public void verifyFollowButtonFocusState() {
        profileSearchPage.verifyFollowButtonHasFocus();
    }

    @When("the user clicks on the web link in the profile section")
    public void clickWebLink() {
        profileSearchPage.clickWebLink();
    }

    @Then("the web link should show a focus state with visual feedback")
    public void verifyWebLinkFocusState() {
        profileSearchPage.verifyWebLinkHasFocus();
    }

    @When("the user clicks on a follower link in the followers list")
    public void clickFollowerLink() {
        profileSearchPage.clickFirstFollowerLink();
    }

    @Then("the follower link should display a focus state correctly")
    public void verifyFollowerLinkFocusState() {
        profileSearchPage.verifyFollowerLinkHasFocus();
    }

    @When("the user navigates using Tab key")
    public void navigateUsingTabKey() {
        profileSearchPage.navigateWithTabKey();
    }

    @Then("keyboard focus states should match click-based focus states")
    public void verifyKeyboardFocusConsistency() {
        profileSearchPage.verifyKeyboardFocusConsistency();
    }
}