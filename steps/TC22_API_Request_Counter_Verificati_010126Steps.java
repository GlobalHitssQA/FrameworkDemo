package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ApiRequestCounterPage;
import static org.junit.Assert.assertTrue;

public class ApiRequestCounterSteps {

    private Page page;
    private ApiRequestCounterPage apiRequestCounterPage;

    public ApiRequestCounterSteps(Page page) {
        this.page = page;
        this.apiRequestCounterPage = new ApiRequestCounterPage(page);
    }

    @Given("the user accesses the GitHub profile search application")
    public void theUserAccessesTheGitHubProfileSearchApplication() {
        apiRequestCounterPage.navigateToApplication();
        assertTrue("Application should load successfully", apiRequestCounterPage.isApplicationLoaded());
    }

    @When("the user locates the API request counter display")
    public void theUserLocatesTheApiRequestCounterDisplay() {
        assertTrue("API request counter should be present", apiRequestCounterPage.isApiCounterPresent());
    }

    @Then("the counter should be visible on the interface")
    public void theCounterShouldBeVisibleOnTheInterface() {
        assertTrue("API request counter should be visible", apiRequestCounterPage.isApiCounterVisible());
    }

    @And("the counter format should match the pattern X\/Y where X is consumed requests and Y is total limit")
    public void theCounterFormatShouldMatchThePatternXY() {
        assertTrue("Counter format should match X/Y pattern", apiRequestCounterPage.isCounterFormatValid());
    }

    @And("both numbers in the counter should be positive integers")
    public void bothNumbersInTheCounterShouldBePositiveIntegers() {
        assertTrue("Both counter values should be positive integers", apiRequestCounterPage.areCounterValuesPositiveIntegers());
    }
}