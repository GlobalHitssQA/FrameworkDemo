package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    
    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }
    
    @Given("the advisor is logged into Acticenter dashboard")
    public void theAdvisorIsLoggedIntoActicenterDashboard() {
        prospectSearchPage.navigateToDashboard();
        assertTrue("Dashboard should be visible", prospectSearchPage.isDashboardVisible());
    }
    
    @When("the advisor enters a prospect name in the search field")
    public void theAdvisorEntersAProspectNameInTheSearchField() {
        prospectSearchPage.enterProspectName("Test Prospect");
    }
    
    @And("the advisor executes the search operation")
    public void theAdvisorExecutesTheSearchOperation() {
        prospectSearchPage.clickSearchButton();
    }
    
    @Then("search results are displayed")
    public void searchResultsAreDisplayed() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
    }
    
    @And("each search result entry displays the prospect's electronic email key")
    public void eachSearchResultEntryDisplaysTheProspectsElectronicEmailKey() {
        assertTrue("All results should contain email field", prospectSearchPage.allResultsContainEmail());
    }
    
    @And("the electronic email key is in valid email format")
    public void theElectronicEmailKeyIsInValidEmailFormat() {
        assertTrue("All emails should be in valid format", prospectSearchPage.allEmailsAreValid());
    }
}