package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.MexdolarContractPage;
import pages.LoginPage;
import pages.AdvisorModulePage;

public class MexdolarContractSteps {
    private WebDriver driver;
    private LoginPage loginPage;
    private AdvisorModulePage advisorModulePage;
    private MexdolarContractPage mexdolarContractPage;

    public MexdolarContractSteps(WebDriver driver) {
        this.driver = driver;
        this.loginPage = new LoginPage(driver);
        this.advisorModulePage = new AdvisorModulePage(driver);
        this.mexdolarContractPage = new MexdolarContractPage(driver);
    }

    @Given("the advisor user is authenticated in Acticenter")
    public void theAdvisorUserIsAuthenticatedInActicenter() {
        loginPage.navigateToActicenter();
    }

    @Given("Acticenter microservices are operational")
    public void acticenterMicroservicesAreOperational() {
        // Verification handled by infrastructure
    }

    @Given("Lumina integration is working")
    public void luminaIntegrationIsWorking() {
        // Verification handled by infrastructure
    }

    @Given("Mexdolar contracts are configured as read-only")
    public void mexdolarContractsAreConfiguredAsReadOnly() {
        // Configuration verification
    }

    @Given("the advisor user accesses Acticenter platform")
    public void theAdvisorUserAccessesActicenterPlatform() {
        loginPage.loginAsAdvisor();
    }

    @When("the user searches and selects a Moral Person Mexdolar contract from Advisor module")
    public void theUserSearchesAndSelectsMoralPersonMexdolarContract() {
        advisorModulePage.searchMexdolarContract();
        advisorModulePage.selectMoralPersonContract();
    }

    @Then("the Mexdolar contract loads in Acticenter for consultation")
    public void theMexdolarContractLoadsInActicenterForConsultation() {
        mexdolarContractPage.verifyContractLoaded();
    }

    @And("the contract is displayed in read-only mode without operation capability")
    public void theContractIsDisplayedInReadOnlyMode() {
        mexdolarContractPage.verifyReadOnlyMode();
    }

    @When("the user validates the USD Cash field")
    public void theUserValidatesTheUSDCashField() {
        mexdolarContractPage.validateUSDCashField();
    }

    @Then("the Mexdolar contract balance is displayed without exchange rate conversion")
    public void theMexdolarContractBalanceIsDisplayedWithoutConversion() {
        mexdolarContractPage.verifyBalanceWithoutConversion();
    }

    @And("the service amount is presented as USD Cash in total valuation breakdown without MXN conversion")
    public void theServiceAmountIsPresentedAsUSDCash() {
        mexdolarContractPage.verifyUSDCashInValuationBreakdown();
    }

    @When("the user attempts to access the buy-sell component to perform an operation")
    public void theUserAttemptsToAccessBuySellComponent() {
        mexdolarContractPage.attemptToAccessBuySellComponent();
    }

    @Then("the buy-sell component is disabled and does not allow opening operation functionality")
    public void theBuySellComponentIsDisabled() {
        mexdolarContractPage.verifyBuySellComponentDisabled();
    }

    @And("no buy or sell options are displayed when trying to interact with the component")
    public void noBuyOrSellOptionsAreDisplayed() {
        mexdolarContractPage.verifyNoBuySellOptionsDisplayed();
    }

    @And("the system keeps the buy-sell component disabled to avoid errors with Lumina")
    public void theSystemKeepsBuySellComponentDisabled() {
        mexdolarContractPage.verifyComponentRemainsDisabled();
    }

    @When("the user consults the total valuation breakdown information")
    public void theUserConsultsValuationBreakdown() {
        mexdolarContractPage.consultValuationBreakdown();
    }

    @Then("the valuation information is correctly displayed showing only USD Cash without operation items")
    public void theValuationInformationIsCorrectlyDisplayed() {
        mexdolarContractPage.verifyValuationWithoutOperationItems();
    }

    @And("the interbank clearing house does not execute processes for this contract")
    public void theInterbankClearingHouseDoesNotExecuteProcesses() {
        mexdolarContractPage.verifyNoClearingHouseProcesses();
    }

    @And("no operations or settlement processes are generated since the contract is read-only")
    public void noOperationsOrSettlementProcessesAreGenerated() {
        mexdolarContractPage.verifyNoSettlementProcesses();
    }
}