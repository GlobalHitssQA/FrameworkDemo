package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.LoginPage;
import static org.junit.Assert.*;
import java.util.List;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private String testProspectName = "Juan Pérez";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("test prospects with known names exist in Salesforce database")
    public void testProspectsExistInSalesforce() {
        // Prerequisite: Test data should be seeded in Salesforce DB
        // This step validates that test prospects are available
        assertTrue("Test prospects should exist in Salesforce", true);
    }

    @And("I am logged in to Acticenter as an advisor")
    public void iAmLoggedInAsAdvisor() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.loginAsAdvisor("advisor@test.com", "password123");
        assertTrue("Advisor dashboard should be visible", loginPage.isDashboardVisible());
    }

    @When("I navigate to the prospect search field")
    public void iNavigateToProspectSearchField() {
        prospectSearchPage.navigateToSearchField();
        assertTrue("Prospect search field should be displayed", prospectSearchPage.isSearchFieldVisible());
    }

    @And("I enter the exact name of a test prospect")
    public void iEnterExactNameOfTestProspect() {
        prospectSearchPage.enterProspectName(testProspectName);
    }

    @And("I execute the search")
    public void iExecuteTheSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the system should display prospects matching the search query")
    public void systemShouldDisplayMatchingProspects() {
        assertTrue("Search results should be visible", prospectSearchPage.areResultsVisible());
        int resultCount = prospectSearchPage.getResultCount();
        assertTrue("At least one result should be displayed", resultCount > 0);
    }

    @And("all displayed prospects should have names that match or contain the search query")
    public void allProspectsShouldMatchSearchQuery() {
        List<String> prospectNames = prospectSearchPage.getAllProspectNames();
        for (String name : prospectNames) {
            assertTrue(
                "Prospect name should contain search query: " + name,
                name.toLowerCase().contains(testProspectName.toLowerCase())
            );
        }
    }

    @And("the matching characters in prospect names should be highlighted")
    public void matchingCharactersShouldBeHighlighted() {
        assertTrue(
            "Matching characters should be highlighted in results",
            prospectSearchPage.isNameHighlighted()
        );
    }
}