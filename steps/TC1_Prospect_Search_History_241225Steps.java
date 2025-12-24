package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import pages.LoginPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchHistorySteps {
    private WebDriver driver;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    
    public ProspectSearchHistorySteps() {
        this.driver = new ChromeDriver();
        this.loginPage = new LoginPage(driver);
        this.prospectSearchPage = new ProspectSearchPage(driver);
    }
    
    @Given("the advisor has performed at least one previous prospect search")
    public void theAdvisorHasPerformedAtLeastOnePreviousProspectSearch() {
        // Precondition: assumes search history exists in system
        // This could be validated via API or database query
    }
    
    @And("the advisor is authenticated in Acticenter")
    public void theAdvisorIsAuthenticatedInActicenter() {
        // Precondition: assumes authentication state is maintained
    }
    
    @And("the system stores the advisor's search history")
    public void theSystemStoresTheAdvisorsSearchHistory() {
        // Precondition: system configuration validation
    }
    
    @Given("the advisor is logged in to Acticenter as a Private Banking advisor")
    public void theAdvisorIsLoggedInToActicenterAsAPrivateBankingAdvisor() {
        driver.get("https://acticenter.actinver.com");
        loginPage.login("advisor.user", "password123");
        assertTrue("Login should be successful", loginPage.isDashboardDisplayed());
    }
    
    @When("the advisor accesses the prospect search functionality")
    public void theAdvisorAccessesTheProspectSearchFunctionality() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search field should be enabled", prospectSearchPage.isSearchFieldEnabled());
    }
    
    @And("the advisor clicks on the search field or starts typing a character")
    public void theAdvisorClicksOnTheSearchFieldOrStartsTypingACharacter() {
        prospectSearchPage.clickSearchField();
    }
    
    @Then("the system automatically displays the last 5 searches performed by the advisor")
    public void theSystemAutomaticallyDisplaysTheLast5SearchesPerformedByTheAdvisor() {
        int historyCount = prospectSearchPage.getSearchHistoryCount();
        assertTrue("Should display up to 5 search history items", historyCount <= 5 && historyCount > 0);
    }
    
    @And("each history record shows the prospect name and email address")
    public void eachHistoryRecordShowsTheProspectNameAndEmailAddress() {
        assertTrue("All history items should show name", prospectSearchPage.allHistoryItemsHaveName());
        assertTrue("All history items should show email", prospectSearchPage.allHistoryItemsHaveEmail());
    }
    
    @When("the advisor selects one of the prospects from the displayed history")
    public void theAdvisorSelectsOneOfTheProspectsFromTheDisplayedHistory() {
        prospectSearchPage.selectFirstHistoryItem();
    }
    
    @Then("the system loads the selected prospect information")
    public void theSystemLoadsTheSelectedProspectInformation() {
        assertTrue("Prospect details should be loaded", prospectSearchPage.isProspectDetailsDisplayed());
    }
    
    @And("the advisor can continue with the process")
    public void theAdvisorCanContinueWithTheProcess() {
        assertTrue("Process continuation options should be available", prospectSearchPage.areContinueOptionsAvailable());
    }
    
    @io.cucumber.java.After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}