package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class FollowersListSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    public FollowersListSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchComponent();
        assertTrue("Search component should be visible", profileSearchPage.isSearchComponentVisible());
    }

    @When("the user enters a valid GitHub username with followers in the search field")
    public void theUserEntersAValidGitHubUsernameWithFollowersInTheSearchField() {
        String validUsername = "octocat";
        profileSearchPage.enterUsername(validUsername);
        assertTrue("Username should be entered in the input field", profileSearchPage.isUsernameEntered(validUsername));
    }

    @And("the user clicks the search button to retrieve the profile")
    public void theUserClicksTheSearchButtonToRetrieveTheProfile() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("the right section where the followers list is displayed should be visible")
    public void theRightSectionWhereTheFollowersListIsDisplayedShouldBeVisible() {
        assertTrue("Right section should be visible", profileSearchPage.isRightSectionVisible());
        assertTrue("Right section should be aligned with main profile", profileSearchPage.isRightSectionAlignedWithProfile());
    }

    @And("the followers list should be displayed as a vertical list")
    public void theFollowersListShouldBeDisplayedAsAVerticalList() {
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
        assertTrue("Followers list should be displayed vertically", profileSearchPage.isFollowersListVertical());
    }

    @And("each follower entry should be visible in the list")
    public void eachFollowerEntryShouldBeVisibleInTheList() {
        int followerCount = profileSearchPage.getFollowerEntriesCount();
        assertTrue("At least one follower should be present", followerCount > 0);
        assertTrue("All follower entries should be visible", profileSearchPage.areAllFollowerEntriesVisible());
    }
}