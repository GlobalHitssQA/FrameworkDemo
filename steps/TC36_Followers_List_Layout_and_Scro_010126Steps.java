package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileFinderPage;
import static org.junit.Assert.*;

public class FollowersListSteps {

    private Page page;
    private GitHubProfileFinderPage profileFinderPage;

    public FollowersListSteps(Page page) {
        this.page = page;
        this.profileFinderPage = new GitHubProfileFinderPage(page);
    }

    @Given("the user navigates to the GitHub Profile Finder application")
    public void theUserNavigatesToTheGitHubProfileFinderApplication() {
        profileFinderPage.navigateTo();
    }

    @When("the user searches for a GitHub user with many followers")
    public void theUserSearchesForAGitHubUserWithManyFollowers() {
        profileFinderPage.searchUser("torvalds");
    }

    @Then("the user profile is loaded with a followers list containing multiple entries")
    public void theUserProfileIsLoadedWithAFollowersListContainingMultipleEntries() {
        assertTrue("Profile should be visible", profileFinderPage.isProfileVisible());
        assertTrue("Followers list should have multiple entries", profileFinderPage.getFollowersCount() > 1);
    }

    @And("the followers list section is positioned on the right side aligned with user details")
    public void theFollowersListSectionIsPositionedOnTheRightSideAlignedWithUserDetails() {
        assertTrue("Followers list should be on the right side", profileFinderPage.isFollowersListOnRightSide());
        assertTrue("Followers list should be vertically aligned with user details", profileFinderPage.isFollowersListAlignedWithUserDetails());
    }

    @And("each follower entry displays an avatar username and profile link")
    public void eachFollowerEntryDisplaysAnAvatarUsernameAndProfileLink() {
        assertTrue("Each follower should have an avatar", profileFinderPage.allFollowersHaveAvatar());
        assertTrue("Each follower should have a username", profileFinderPage.allFollowersHaveUsername());
        assertTrue("Each follower should have a profile link", profileFinderPage.allFollowersHaveProfileLink());
    }

    @When("the user scrolls the followers list vertically")
    public void theUserScrollsTheFollowersListVertically() {
        profileFinderPage.scrollFollowersList();
    }

    @Then("the followers list allows scrolling without affecting other components layout")
    public void theFollowersListAllowsScrollingWithoutAffectingOtherComponentsLayout() {
        assertTrue("Followers list should be scrollable", profileFinderPage.isFollowersListScrollable());
        assertTrue("User details section position should remain unchanged", profileFinderPage.isUserDetailsSectionPositionUnchanged());
    }

    @And("alignment and spacing remain consistent during scroll")
    public void alignmentAndSpacingRemainConsistentDuringScroll() {
        assertTrue("Follower entries should maintain consistent spacing", profileFinderPage.isFollowerSpacingConsistent());
        assertTrue("Follower entries should maintain vertical alignment", profileFinderPage.isFollowerAlignmentConsistent());
    }

    @When("the user searches for a GitHub user with few followers")
    public void theUserSearchesForAGitHubUserWithFewFollowers() {
        profileFinderPage.clearSearch();
        profileFinderPage.searchUser("torvalds-test-minimal");
    }

    @Then("no scroll appears and the followers list displays properly aligned")
    public void noScrollAppearsAndTheFollowersListDisplaysProperlyAligned() {
        assertFalse("Scroll should not appear for few followers", profileFinderPage.isFollowersListScrollable());
        assertTrue("Followers list should be properly aligned", profileFinderPage.isFollowersListAlignedWithUserDetails());
    }
}