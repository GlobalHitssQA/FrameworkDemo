package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import pages.DashboardPage;
import static org.junit.Assert.*;

public class ProspectSearchScrollSteps {
    
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private DashboardPage dashboardPage;
    private int initialResultCount;
    private String dashboardState;
    
    public ProspectSearchScrollSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.dashboardPage = new DashboardPage(page);
    }
    
    @Given("the user is logged in as an advisor in Acticenter")
    public void theUserIsLoggedInAsAnAdvisorInActicenter() {
        prospectSearchPage.navigateToActicenter();
        assertTrue("User should be logged in as advisor", prospectSearchPage.isAdvisorLoggedIn());
    }
    
    @And("the user navigates to the prospect search section")
    public void theUserNavigatesToTheProspectSearchSection() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Prospect search field should be available", prospectSearchPage.isSearchFieldAvailable());
    }
    
    @When("the user enters a search term with more than 2 alphanumeric characters that returns more than 6 results")
    public void theUserEntersASearchTermWithMoreThan2AlphanumericCharactersThatReturnsMoreThan6Results() {
        String searchTerm = "Mar";
        prospectSearchPage.enterSearchTerm(searchTerm);
        prospectSearchPage.waitForSearchResults();
    }
    
    @Then("the system displays the first 6 prospect coincidences")
    public void theSystemDisplaysTheFirst6ProspectCoincidences() {
        initialResultCount = prospectSearchPage.getVisibleResultsCount();
        assertEquals("Should display exactly 6 initial results", 6, initialResultCount);
    }
    
    @And("each result shows the prospect name with matching characters highlighted in bold")
    public void eachResultShowsTheProspectNameWithMatchingCharactersHighlightedInBold() {
        assertTrue("Matching characters should be highlighted in bold", 
            prospectSearchPage.areMatchingCharactersHighlighted());
    }
    
    @And("each result shows the prospect email address")
    public void eachResultShowsTheProspectEmailAddress() {
        assertTrue("Each result should display email address", 
            prospectSearchPage.areEmailAddressesDisplayed());
    }
    
    @When("the user locates the scroll element in the search results area")
    public void theUserLocatesTheScrollElementInTheSearchResultsArea() {
        assertTrue("Scroll element should be present", 
            prospectSearchPage.isScrollElementPresent());
    }
    
    @Then("the scroll bar is visible and available for interaction")
    public void theScrollBarIsVisibleAndAvailableForInteraction() {
        assertTrue("Scroll bar should be visible", 
            prospectSearchPage.isScrollBarVisible());
        assertTrue("Scroll bar should be interactive", 
            prospectSearchPage.isScrollBarInteractive());
    }
    
    @When("the user scrolls down in the results list")
    public void theUserScrollsDownInTheResultsList() {
        prospectSearchPage.scrollDownResults();
    }
    
    @Then("additional prospects beyond the first 6 are loaded and displayed")
    public void additionalProspectsBeyondTheFirst6AreLoadedAndDisplayed() {
        int newResultCount = prospectSearchPage.getVisibleResultsCount();
        assertTrue("Should display more than 6 results after scrolling", 
            newResultCount > initialResultCount);
    }
    
    @When("the user continues scrolling through all results")
    public void theUserContinuesScrollingThroughAllResults() {
        prospectSearchPage.scrollToEndOfResults();
    }
    
    @Then("all matching prospects are accessible through progressive loading")
    public void allMatchingProspectsAreAccessibleThroughProgressiveLoading() {
        assertTrue("All results should be loaded", 
            prospectSearchPage.areAllResultsLoaded());
    }
    
    @When("the user does not select any prospect from the results")
    public void theUserDoesNotSelectAnyProspectFromTheResults() {
        dashboardState = dashboardPage.getCurrentDashboardState();
        prospectSearchPage.clickOutsideResults();
    }
    
    @Then("the dashboard remains unchanged and allows continued searching")
    public void theDashboardRemainsUnchangedAndAllowsContinuedSearching() {
        assertEquals("Dashboard state should remain unchanged", 
            dashboardState, dashboardPage.getCurrentDashboardState());
        assertTrue("Search functionality should still be available", 
            prospectSearchPage.isSearchFieldAvailable());
    }
}