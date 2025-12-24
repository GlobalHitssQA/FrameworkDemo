package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private WebDriver driver;
    private ProspectSearchPage prospectSearchPage;
    
    public ProspectSearchSteps(WebDriver driver) {
        this.driver = driver;
        this.prospectSearchPage = new ProspectSearchPage(driver);
    }
    
    @Given("the user is authenticated as an advisor")
    public void theUserIsAuthenticatedAsAnAdvisor() {
        // Authentication logic - assumes session is already established
        assertTrue("User should be authenticated", prospectSearchPage.isUserAuthenticated());
    }
    
    @And("the user has access to Perspectiva Act Pitch Book dashboard")
    public void theUserHasAccessToPerspectiveActPitchBookDashboard() {
        assertTrue("Dashboard should be accessible", prospectSearchPage.isDashboardAccessible());
    }
    
    @And("the Salesforce database contains more than 5 prospects matching search criteria")
    public void theSalesforceDatabaseContainsMoreThan5ProspectsMatchingSearchCriteria() {
        // Precondition validation - assumes database state
        // This would typically be handled by test data setup
    }
    
    @Given("the user is on the advisor dashboard in Perspectiva Act Pitch Book")
    public void theUserIsOnTheAdvisorDashboardInPerspectiveActPitchBook() {
        prospectSearchPage.navigateToDashboard();
        assertTrue("Dashboard should be displayed", prospectSearchPage.isDashboardDisplayed());
    }
    
    @When("the user enters more than 2 characters in the search field that generates more than 5 matches {string}")
    public void theUserEntersMoreThan2CharactersInTheSearchField(String searchTerm) {
        prospectSearchPage.enterSearchTerm(searchTerm);
        prospectSearchPage.clickSearchButton();
    }
    
    @Then("the system executes the search and retrieves more than 5 matching results")
    public void theSystemExecutesTheSearchAndRetrievesMoreThan5MatchingResults() {
        prospectSearchPage.waitForSearchResults();
        int totalResults = prospectSearchPage.getTotalResultsCount();
        assertTrue("Total results should be greater than 5", totalResults > 5);
    }
    
    @And("the system displays the first 5 prospect matches with name and email")
    public void theSystemDisplaysTheFirst5ProspectMatchesWithNameAndEmail() {
        int visibleResults = prospectSearchPage.getVisibleResultsCount();
        assertEquals("Should display exactly 5 visible results", 5, visibleResults);
        
        for (int i = 0; i < 5; i++) {
            assertTrue("Prospect name should be displayed", prospectSearchPage.isProspectNameDisplayed(i));
            assertTrue("Prospect email should be displayed", prospectSearchPage.isProspectEmailDisplayed(i));
        }
    }
    
    @And("the scroll is present to access additional matches")
    public void theScrollIsPresentToAccessAdditionalMatches() {
        assertTrue("Scroll should be present", prospectSearchPage.isScrollPresent());
        assertTrue("Scroll should be enabled", prospectSearchPage.isScrollEnabled());
    }
    
    @When("the user scrolls down to view additional matches")
    public void theUserScrollsDownToViewAdditionalMatches() {
        prospectSearchPage.scrollToAdditionalResults();
    }
    
    @Then("the system allows viewing the remaining matches beyond the sixth result")
    public void theSystemAllowsViewingTheRemainingMatchesBeyondTheSixthResult() {
        int visibleResultsAfterScroll = prospectSearchPage.getVisibleResultsCount();
        assertTrue("Should display more than 5 results after scrolling", visibleResultsAfterScroll > 5);
    }
    
    @And("all matches display prospect name and email correctly")
    public void allMatchesDisplayProspectNameAndEmailCorrectly() {
        int totalVisible = prospectSearchPage.getVisibleResultsCount();
        
        for (int i = 0; i < totalVisible; i++) {
            String prospectName = prospectSearchPage.getProspectName(i);
            String prospectEmail = prospectSearchPage.getProspectEmail(i);
            
            assertNotNull("Prospect name should not be null", prospectName);
            assertFalse("Prospect name should not be empty", prospectName.trim().isEmpty());
            assertNotNull("Prospect email should not be null", prospectEmail);
            assertFalse("Prospect email should not be empty", prospectEmail.trim().isEmpty());
            assertTrue("Email should contain @ symbol", prospectEmail.contains("@"));
        }
    }
}