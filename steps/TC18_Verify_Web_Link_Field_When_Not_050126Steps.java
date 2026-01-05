package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProfileSearchPage;
import static org.junit.Assert.*;

public class VerifyWebLinkFieldSteps {
    private Page page;
    private ProfileSearchPage profileSearchPage;
    
    public VerifyWebLinkFieldSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new ProfileSearchPage(page);
    }
    
    @Given("the user navigates to the GitHub profile search component")
    public void userNavigatesToGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchPage();
        assertTrue("Search component should be displayed", profileSearchPage.isSearchComponentVisible());
    }
    
    @When("the user enters a GitHub username that has no web link in their profile")
    public void userEntersGitHubUsernameWithNoWebLink() {
        profileSearchPage.enterUsername("torvalds");
    }
    
    @And("the user clicks the search button to retrieve the profile")
    public void userClicksSearchButton() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileLoad();
    }
    
    @And("the user navigates to the left section showing user details")
    public void userNavigatesToUserDetailsSection() {
        assertTrue("User details section should be visible", profileSearchPage.isUserDetailsSectionVisible());
    }
    
    @Then("the web link field should display either empty or show 'Not available' message")
    public void webLinkFieldShouldDisplayEmptyOrNotAvailable() {
        String webLinkText = profileSearchPage.getWebLinkText();
        boolean isValid = webLinkText == null || 
                         webLinkText.trim().isEmpty() || 
                         webLinkText.equalsIgnoreCase("Not available") ||
                         webLinkText.equalsIgnoreCase("No website available");
        assertTrue("Web link field should be empty or display 'Not available'", isValid);
    }
}