package steps;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.ViewportSize;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class LeftSectionAlignmentSteps {
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String VALID_USERNAME = "octocat";

    public LeftSectionAlignmentSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub Profile Search application on desktop view")
    public void navigateToApplicationDesktopView() {
        page.setViewportSize(1920, 1080);
        profileSearchPage.navigateTo();
    }

    @When("the user enters a valid GitHub username and performs search")
    public void enterUsernameAndSearch() {
        profileSearchPage.searchUser(VALID_USERNAME);
    }

    @Then("the user profile information should be displayed")
    public void verifyProfileDisplayed() {
        assertTrue("Profile should be visible", profileSearchPage.isProfileVisible());
    }

    @And("the left section containing user details should be properly aligned to the left side")
    public void verifyLeftSectionAlignment() {
        assertTrue("Left section should be aligned to left", profileSearchPage.isLeftSectionAlignedLeft());
    }

    @And("the left section should maintain consistent spacing and margins with other components")
    public void verifyConsistentSpacing() {
        assertTrue("Left section should have consistent spacing", profileSearchPage.hasConsistentSpacing());
    }

    @When("the user resizes browser window to tablet portrait view")
    public void resizeToTabletPortrait() {
        page.setViewportSize(768, 1024);
        page.waitForTimeout(500);
    }

    @Then("the layout should adapt responsively to tablet dimensions")
    public void verifyTabletResponsiveness() {
        assertTrue("Layout should adapt to tablet", profileSearchPage.isLayoutResponsive());
    }

    @And("the left section alignment should be maintained or adapted appropriately in tablet view")
    public void verifyLeftSectionTabletAlignment() {
        assertTrue("Left section should maintain alignment in tablet", profileSearchPage.isLeftSectionAlignedInTablet());
    }

    @When("the user resizes browser window to mobile portrait view")
    public void resizeToMobilePortrait() {
        page.setViewportSize(375, 667);
        page.waitForTimeout(500);
    }

    @Then("the layout should adapt responsively to mobile dimensions")
    public void verifyMobileResponsiveness() {
        assertTrue("Layout should adapt to mobile", profileSearchPage.isLayoutResponsive());
    }

    @And("the left section should adjust to mobile layout maintaining proper alignment")
    public void verifyLeftSectionMobileAlignment() {
        assertTrue("Left section should maintain alignment in mobile", profileSearchPage.isLeftSectionAlignedInMobile());
    }

    @When("the user tests landscape orientation on mobile or tablet")
    public void resizeToLandscape() {
        page.setViewportSize(667, 375);
        page.waitForTimeout(500);
    }

    @Then("the left section alignment should adapt correctly to landscape orientation")
    public void verifyLandscapeAlignment() {
        assertTrue("Left section should adapt to landscape", profileSearchPage.isLeftSectionAlignedInLandscape());
    }

    @And("all user detail fields within the left section should maintain proper internal alignment")
    public void verifyInternalAlignment() {
        assertTrue("Avatar should be visible", profileSearchPage.isAvatarVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
        assertTrue("Bio should be visible", profileSearchPage.isBioVisible());
        assertTrue("All elements should be properly aligned internally", profileSearchPage.areInternalElementsAligned());
    }
}