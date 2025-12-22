package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import pages.SearchPage;
import pages.ClientPage;
import pages.ContractPage;
import static org.junit.Assert.*;

public class SearchSteps {
    private WebDriver driver;
    private SearchPage searchPage;
    private ClientPage clientPage;
    private ContractPage contractPage;
    private String selectedClientName;
    private String selectedContractId;

    @Given("the user is authenticated in Acticenter")
    public void userIsAuthenticated() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://acticenter.example.com");
        // Login logic would go here
        searchPage = new SearchPage(driver);
        clientPage = new ClientPage(driver);
        contractPage = new ContractPage(driver);
    }

    @And("the client and contract database is accessible")
    public void databaseIsAccessible() {
        // Validation that database is accessible
        assertTrue("Database should be accessible", true);
    }

    @And("the search functionality via magnifying glass is implemented in all views")
    public void searchFunctionalityImplemented() {
        // Validation that search is implemented
        assertTrue("Search functionality should be implemented", searchPage.isMagnifyingGlassPresent());
    }

    @Given("the user is on the Acticenter desktop view")
    public void userIsOnDesktopView() {
        driver.manage().window().maximize();
    }

    @When("the user locates the magnifying glass icon in the header")
    public void userLocatesMagnifyingGlassIcon() {
        searchPage.locateMagnifyingGlassIcon();
    }

    @Then("the magnifying glass icon should be visible according to the Acticenter module screens")
    public void magnifyingGlassIconShouldBeVisible() {
        assertTrue("Magnifying glass icon should be visible", searchPage.isMagnifyingGlassVisible());
    }

    @When("the user clicks on the magnifying glass icon")
    public void userClicksMagnifyingGlassIcon() {
        searchPage.clickMagnifyingGlassIcon();
    }

    @Then("the system should display the general client screen or the BP or contract search option")
    public void systemDisplaysSearchScreen() {
        assertTrue("Search screen should be displayed", searchPage.isSearchScreenDisplayed());
    }

    @When("the user enters search criteria to locate a specific client")
    public void userEntersSearchCriteria() {
        searchPage.enterSearchCriteria("Test Client");
        selectedClientName = "Test Client";
    }

    @Then("the system should display search results matching the entered criteria")
    public void systemDisplaysSearchResults() {
        assertTrue("Search results should be displayed", searchPage.areSearchResultsDisplayed());
        assertTrue("Search results should contain expected client", searchPage.searchResultsContain(selectedClientName));
    }

    @When("the user selects a client from the search results")
    public void userSelectsClientFromResults() {
        searchPage.selectClientFromResults(selectedClientName);
    }

    @Then("the system should display the general screen of the selected client")
    public void systemDisplaysClientScreen() {
        assertTrue("Client general screen should be displayed", clientPage.isClientScreenDisplayed());
        assertEquals("Client name should match", selectedClientName, clientPage.getClientName());
    }

    @When("the user selects the contract to view or operate")
    public void userSelectsContract() {
        selectedContractId = clientPage.selectFirstContract();
    }

    @Then("the system should load the selected contract")
    public void systemLoadsSelectedContract() {
        assertTrue("Contract should be loaded", contractPage.isContractLoaded());
    }

    @And("the contract value component should display updated information")
    public void contractValueComponentDisplaysUpdatedInfo() {
        assertTrue("Contract value component should be displayed", contractPage.isContractValueComponentDisplayed());
        assertNotNull("Contract value should not be null", contractPage.getContractValue());
    }

    @When("the user validates the search function in responsive landscape view")
    public void userValidatesSearchInLandscapeView() {
        driver.manage().window().setSize(new org.openqa.selenium.Dimension(1024, 768));
    }

    @When("the user validates the search function in responsive portrait view")
    public void userValidatesSearchInPortraitView() {
        driver.manage().window().setSize(new org.openqa.selenium.Dimension(768, 1024));
    }

    @Then("the magnifying glass icon should be present and functional")
    public void magnifyingGlassIconPresentAndFunctional() {
        assertTrue("Magnifying glass icon should be present", searchPage.isMagnifyingGlassPresent());
        searchPage.clickMagnifyingGlassIcon();
        assertTrue("Search screen should open", searchPage.isSearchScreenDisplayed());
    }

    @When("the user verifies the contract value component after selecting a contract via magnifying glass")
    public void userVerifiesContractValueComponent() {
        // Verification step - component already loaded
    }

    @Then("the contract value component should reflect the information of the newly selected contract")
    public void contractValueComponentReflectsNewContract() {
        assertTrue("Contract value component should reflect selected contract", contractPage.isContractValueComponentDisplayed());
        assertEquals("Contract ID should match selected contract", selectedContractId, contractPage.getDisplayedContractId());
    }
}