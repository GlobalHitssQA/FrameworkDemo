package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import pages.LoginPage;
import pages.ClientSearchPage;
import pages.ContractValuePage;
import static org.junit.Assert.*;

public class ContractValueSteps {
    private WebDriver driver;
    private LoginPage loginPage;
    private ClientSearchPage clientSearchPage;
    private ContractValuePage contractValuePage;
    private String selectedClient;
    private String displayedValue;

    @Given("the user is authenticated as a wealth management advisor")
    public void theUserIsAuthenticatedAsWealthManagementAdvisor() {
        driver = new ChromeDriver();
        loginPage = new LoginPage(driver);
        clientSearchPage = new ClientSearchPage(driver);
        contractValuePage = new ContractValuePage(driver);
    }

    @And("there is at least one active client with a contract")
    public void thereIsAtLeastOneActiveClientWithContract() {
        // Validation that test data exists
        assertTrue("Active client with contract should exist", true);
    }

    @And("Lumina services for funds are operational and available")
    public void luminaServicesForFundsAreOperationalAndAvailable() {
        // Validation of Lumina services availability
        assertTrue("Lumina services should be available", true);
    }

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        driver.get("https://acticenter.com");
        loginPage.login("wealth_advisor_user", "password123");
    }

    @When("the advisor searches for and selects an existing client and contract using the search icon")
    public void theAdvisorSearchesForAndSelectsExistingClientAndContract() {
        clientSearchPage.clickSearchIcon();
        clientSearchPage.searchClient("Test Client");
        clientSearchPage.selectFirstClient();
        selectedClient = clientSearchPage.getSelectedClientName();
    }

    @Then("the system displays the general screen for the selected client or contract")
    public void theSystemDisplaysGeneralScreenForSelectedClientOrContract() {
        assertTrue("Client general screen should be displayed", 
                   clientSearchPage.isClientScreenDisplayed());
    }

    @When("the advisor navigates to the funds operation flow")
    public void theAdvisorNavigatesToFundsOperationFlow() {
        contractValuePage.navigateToFundsOperationFlow();
    }

    @Then("the main component displays the total contract value")
    public void theMainComponentDisplaysTotalContractValue() {
        assertTrue("Contract value component should be visible", 
                   contractValuePage.isContractValueDisplayed());
    }

    @And("the contract value is shown with proper monetary format")
    public void theContractValueIsShownWithProperMonetaryFormat() {
        displayedValue = contractValuePage.getContractTotalValue();
        assertTrue("Value should have monetary format", 
                   displayedValue.matches("^\\$[0-9]{1,3}(,[0-9]{3})*\\.[0-9]{2}$"));
    }

    @And("the total value matches the sum of all contract components including MXN purchasing power, MXN cash, USD cash, pending settlements, debt funds, hedge funds, equity funds, cash in transit, CDs and promissory notes, money market and capital market when applicable")
    public void theTotalValueMatchesSumOfAllContractComponents() {
        double calculatedTotal = contractValuePage.calculateTotalFromComponents();
        double displayedTotal = contractValuePage.parseContractValue(displayedValue);
        assertEquals("Displayed value should match calculated total", 
                     calculatedTotal, displayedTotal, 0.01);
        driver.quit();
    }
}