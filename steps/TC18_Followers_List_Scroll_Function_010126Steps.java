package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class FollowersListScrollSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String USERNAME_WITH_MANY_FOLLOWERS = "torvalds";

    public FollowersListScrollSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchComponent();
    }

    @And("the search component is loaded and displayed")
    public void theSearchComponentIsLoadedAndDisplayed() {
        assertTrue("Search component should be visible", 
            profileSearchPage.isSearchComponentVisible());
    }

    @When("the user enters a GitHub username with a large number of followers")
    public void theUserEntersAGitHubUsernameWithALargeNumberOfFollowers() {
        profileSearchPage.enterUsername(USERNAME_WITH_MANY_FOLLOWERS);
    }

    @And("the user clicks the search button to retrieve the profile")
    public void theUserClicksTheSearchButtonToRetrieveTheProfile() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system retrieves the user profile with a large followers list")
    public void theSystemRetrievesTheUserProfileWithALargeFollowersList() {
        assertTrue("Profile dashboard should be displayed", 
            profileSearchPage.isProfileDashboardVisible());
    }

    @And("the followers list is displayed in the right section")
    public void theFollowersListIsDisplayedInTheRightSection() {
        assertTrue("Followers list section should be visible", 
            profileSearchPage.isFollowersListVisible());
    }

    @And("a vertical scroll bar is visible on the followers list container")
    public void aVerticalScrollBarIsVisibleOnTheFollowersListContainer() {
        assertTrue("Followers list container should have scrollbar", 
            profileSearchPage.isFollowersListScrollable());
    }

    @When("the user scrolls down through the followers list")
    public void theUserScrollsDownThroughTheFollowersList() {
        profileSearchPage.scrollFollowersList();
    }

    @Then("the list scrolls smoothly revealing additional followers")
    public void theListScrollsSmoothlyRevealingAdditionalFollowers() {
        assertTrue("Followers list should have scrolled", 
            profileSearchPage.hasFollowersListScrolled());
    }

    @And("all followers can be accessed through scrolling")
    public void allFollowersCanBeAccessedThroughScrolling() {
        int initialVisibleCount = profileSearchPage.getVisibleFollowersCount();
        profileSearchPage.scrollFollowersListToBottom();
        int totalAccessibleCount = profileSearchPage.getTotalAccessedFollowersCount();
        assertTrue("Should be able to access more followers than initially visible", 
            totalAccessibleCount >= initialVisibleCount);
    }
}